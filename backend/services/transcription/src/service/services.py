# 1. Daily job
# For each podcast in podcast_catalog_tab, call PodcastIndex api to get the latest episodes
# If such episode does not exist in job_tab, add it to job_tab
import logging
import time
from typing import List

from util import utils
from util.custom_parser.parser_mapping import PARSER_MAPPING
from model.dao.dao import CustomEpisodeUrlDao, PodcastIndexEpisodeDao, EpisodeTranscriptDao, PodcastCatalogDao
from model.entity.entities import PodcastCatalogEntity, PodcastIndexEpisodeEntity, TranscriptStatus, EpisodeEntity, \
    TranscriptEntryEntity, SummaryEntryEntity
from execeptions import PodcastNotFoundException, NoUrlFoundException
from podcast_index_api.podcast_index_api import PodcastIndexApi, PodcastIndexEpisode
from util.url_crawler.crawler_mapping import CRAWLER_MAPPING


class PodcastCatalogService:
    """
    Manage podcast catalog and Podcast Index episodes.
    """

    @staticmethod
    def add_podcast(id: int) -> None:
        podcast_index_feed = PodcastIndexApi.get_podcast_by_id(id)
        if not podcast_index_feed:
            raise PodcastNotFoundException(id)

        PodcastCatalogDao(
            id=id,
            title=utils.sanitize_title(podcast_index_feed.title),
            original_title=podcast_index_feed.title
        ).save()

    @staticmethod
    def get_podcast_by_id(id: int) -> PodcastCatalogEntity:
        podcast = PodcastCatalogDao.get(id)
        return PodcastCatalogEntity(
            id=podcast.id,
            title=podcast.title,
            original_title=podcast.original_title,
            last_scraped_at=podcast.last_scraped_at
        )

    @staticmethod
    def get_all_podcasts() -> List[PodcastCatalogEntity]:
        result = []
        podcasts = PodcastCatalogDao.scan()
        for podcast in podcasts:
            result.append(
                PodcastCatalogEntity(
                    id=podcast.id,
                    title=podcast.title,
                    original_title=podcast.original_title,
                    last_scraped_at=podcast.last_scraped_at
                )
            )
        return result

    @staticmethod
    def pull_episodes_by_podcast_id(podcast_id: int, since: int = None) -> List[PodcastIndexEpisode]:
        """
        Pull and save the latest episodes from Podcast Index. The podcast_id must be present in podcast catalog.

        :param podcast_id: Podcast Index podcast/feed id
        :param since: last crawled timestamp or custom timestamp
        :return: the episodes pulled
        """
        podcast = PodcastCatalogDao.get(podcast_id)
        since = since if since else podcast.last_scraped_at
        episodes = PodcastIndexApi.get_episodes_by_podcast_id(podcast_id, since)
        for episode in episodes:
            PodcastIndexEpisodeDao(
                id=episode.id,
                title=utils.sanitize_title(episode.title),
                original_title=episode.title,
                podcast_id=podcast_id,
                podcast_title=podcast.title,
                original_podcast_title=podcast.original_title,
                transcript_url=episode.transcript_url,
                published_at=episode.published_at
            ).save(PodcastIndexEpisodeDao.id.does_not_exist())

        podcast.update(actions=[
            PodcastCatalogDao.last_scraped_at.set(int(time.time()))
        ])

        return episodes

    @staticmethod
    def modify_episode_title(id: int, title: str) -> None:
        """
        Edit Podcast Index episode title (sanitized version) to match custom episode title.

        :param id: episode id.
        :param title: new title
        """
        episode = PodcastIndexEpisodeDao.get(id)
        episode.update(actions=[
            PodcastIndexEpisodeDao.title.set(title)
        ])

    @staticmethod
    def modify_episode_custom_url(id: int, url: str) -> None:
        """
        Edit Product Index episode custom transcript url.

        :param id:episode id.
        :param url: new other_transcript_url
        """
        episode = PodcastIndexEpisodeDao.get(id)
        episode.update(actions=[
            PodcastIndexEpisodeDao.other_transcript_url.set(url)
        ])

    @staticmethod
    def get_episode_by_id(id: int) -> PodcastIndexEpisodeEntity:
        episode = PodcastIndexEpisodeDao.get(id)
        return PodcastIndexEpisodeEntity(
            id=episode.id,
            title=episode.title,
            original_title=episode.original_title,
            podcast_id=episode.podcast_id,
            podcast_title=episode.podcast_title,
            original_podcast_title=episode.original_podcast_title,
            transcript_url=episode.transcript_url,
            other_transcript_url=episode.other_transcript_url,
            published_at=episode.published_at,
            transcript_status=episode.transcript_status,
            summary_status=episode.summary_status
        )


class EpisodeTranscriptService:
    """
    Manage episode transcription.
    """

    @staticmethod
    def parse_transcript_by_episode_id(id: int):
        episode = PodcastIndexEpisodeDao.get(id)
        if episode.transcript_status == TranscriptStatus.IDLE.value:
            # prioritize custom URL
            url_to_use = episode.other_transcript_url if episode.other_transcript_url else episode.transcript_url
            if not url_to_use:
                raise NoUrlFoundException()

            transcript = PARSER_MAPPING[episode.podcast_title].run(url=url_to_use)
            EpisodeTranscriptDao(
                id=id,
                podcast_id=episode.podcast_id,
                transcript=transcript
            ).save()

            episode.update(actions=[
                PodcastIndexEpisodeDao.transcript_status.set(TranscriptStatus.COMPLETED.value)
            ])
        else:
            logging.warning(f"Transcript parsing for episode {id} is not {TranscriptStatus.IDLE}. No actions taken.")

    @staticmethod
    def get_episode_by_id(id: int) -> EpisodeEntity:
        data: EpisodeTranscriptDao = EpisodeTranscriptDao.get(id)
        transcript: List[TranscriptEntryEntity] | None = None
        if data.transcript:
            transcript = [
                TranscriptEntryEntity(
                    content=entry.content,
                    speaker=entry.speaker,
                    time=entry.time
                ) for entry in data.transcript
            ]
        summary: List[SummaryEntryEntity] | None = None
        if data.summary:
            summary: List[SummaryEntryEntity] = [
                SummaryEntryEntity(
                    header=entry.header,
                    content=entry.content
                ) for entry in data.summary
            ]
        return EpisodeEntity(
            id=data.id,
            podcast_id=data.podcast_id,
            transcript=transcript,
            summary=summary,
            created_at=data.created_at
        )


class CustomTranscriptUrlService:
    """
    Manage episode custom transcript url.
    """

    @staticmethod
    def get_url(episode_title: str, podcast_title: str) -> str:
        try:
            resp = CustomEpisodeUrlDao.get(
                episode_title,
                podcast_title
            )
            return resp.transcript_url
        except CustomEpisodeUrlDao.DoesNotExist:
            return ""

    @staticmethod
    def get_url_by_episode_id(id: int):
        episode = PodcastIndexEpisodeDao.get(id)
        return CustomTranscriptUrlService.get_url(episode.title, episode.podcast_title)

    @staticmethod
    def crawl_url_by_podcast_title(title: str) -> None:
        """
        Crawl and save custom transcript urls.

        :param title: sanitized podcast title
        """
        resp = CRAWLER_MAPPING[title].run()
        for item in resp:
            CustomEpisodeUrlDao(
                episode_title=utils.sanitize_title(item.episode_title),
                podcast_title=utils.sanitize_title(item.podcast_title),
                transcript_url=item.transcript_url
            ).save(CustomEpisodeUrlDao.episode_title.does_not_exist())

    @staticmethod
    def crawl_url_by_podcast_id(id: int) -> None:
        podcast = PodcastCatalogDao.get(id)
        CustomTranscriptUrlService.crawl_url_by_podcast_title(podcast.title)
