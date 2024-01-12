from typing import List

from fastapi import FastAPI

from model.dto.episode_dto import EpisodeDto, TranscriptEntryDto, SummaryEntryDto
from model.dto.podcast_catalog_dto import PodcastCatalogDto
from model.dto.podcast_index_episode_dto import UpdatePodcastIndexEpisodeDto, PodcastIndexEpisodeDto
from service.services import PodcastCatalogService, CustomTranscriptUrlService, EpisodeTranscriptService, \
    PodcastCatalogEntity, \
    EpisodeEntity

app = FastAPI()


@app.get("/admin/podcast_catalog/")
def get_podcast_catalog() -> List[PodcastCatalogDto]:
    """
    Get all podcast in the podcast catalog.
    """
    podcasts: List[PodcastCatalogEntity] = PodcastCatalogService.get_all_podcasts()

    resp: List[PodcastCatalogDto] = []
    for podcast in podcasts:
        resp.append(PodcastCatalogDto(
            id=podcast.id,
            title=podcast.title,
            original_title=podcast.original_title,
            last_scraped_at=podcast.last_scraped_at
        ))
    return resp


@app.get("/admin/podcast_catalog/add_podcast/{podcast_id}")
def add_podcast_to_podcast_catalog(podcast_id: int) -> None:
    """
    Add a podcast to the podcast catalog.
    """
    PodcastCatalogService.add_podcast(podcast_id)


@app.put("/admin/podcast_index/episode/{episode_id}")
def update_podcast_index_episode(episode_id: int, episode_in: UpdatePodcastIndexEpisodeDto) -> PodcastIndexEpisodeDto:
    PodcastCatalogService.modify_episode_title(episode_id, episode_in.title)
    if episode_in.other_transcript_url:
        PodcastCatalogService.modify_episode_custom_url(episode_id, episode_in.other_transcript_url)
    episode = PodcastCatalogService.get_episode_by_id(episode_id)
    resp = PodcastIndexEpisodeDto(
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
    return resp


@app.get("/admin/podcast_index/pull_episodes/{podcast_id}")
def pull_podcast_index_episodes(podcast_id: int) -> None:
    """
    Pull episodes from PodcastIndex.
    """
    episodes = PodcastCatalogService.pull_episodes_by_podcast_id(podcast_id)
    if len(episodes) > 0:
        CustomTranscriptUrlService.crawl_url_by_podcast_id(podcast_id)
        for episode in episodes:
            PodcastCatalogService.modify_episode_custom_url(
                id=episode.id,
                url=CustomTranscriptUrlService.get_url_by_episode_id(episode.id)
            )


@app.get("/admin/transcript/parse_episode/{episode_id}")
def parse_episode_transcript(episode_id: int) -> None:
    EpisodeTranscriptService.parse_transcript_by_episode_id(episode_id)


@app.get("/app/episode/{episode_id}")
def get_episode(episode_id: int) -> EpisodeDto:
    episode: EpisodeEntity = EpisodeTranscriptService.get_episode_by_id(episode_id)

    resp: EpisodeDto = EpisodeDto(
        id=episode.id,
        podcast_id=episode.podcast_id,
        created_at=episode.created_at,
        transcript=None if not episode.transcript else [
            TranscriptEntryDto(
                content=entry.content,
                speaker=entry.speaker,
                time=entry.time)
            for entry in episode.transcript],
        summary=None if not episode.summary else [
            SummaryEntryDto(
                header=entry.header,
                content=entry.content
            ) for entry in episode.summary
        ]
    )
    return resp
