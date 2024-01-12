import hashlib
import json
import os
from typing import List, Dict

import requests
import time


class PodcastIndexFeed:
    def __init__(self, id: int, title: str, last_parse_time: int):
        self.id = id
        self.title = title
        self.last_parse_time = last_parse_time

    def __repr__(self):
        return f"<PodcastIndexFeed>: id={self.id}, title={self.title}, last_parse_time={self.last_parse_time}"


class PodcastIndexEpisode:
    def __init__(self, id: int, title: str, feed_id: int, published_at: int, transcript_url: str = None,
                 transcripts: List[Dict] = None):
        self.id = id
        self.title = title
        self.feed_id = feed_id
        self.published_at = published_at
        self.transcript_url = transcript_url
        self.transcripts = transcripts

    def __repr__(self):
        return f"<PodcastIndexFeed>: id={self.id}, title={self.title}, feed_id={self.feed_id}, transcrip_url={self.transcript_url}, transcripts={self.transcripts}"


class PodcastIndexApi:
    API_KEY = os.getenv("PODCAST_INDEX_API_KEY")
    API_SECRET = os.getenv("PODCAST_INDEX_API_SECRET")
    BASE_URL = "https://api.podcastindex.org/api/1.0/"

    @staticmethod
    def _get_request_header():
        # we'll need the unix time
        epoch_time = int(time.time())

        # our hash here is the api key + secret + time
        data_to_hash = PodcastIndexApi.API_KEY + PodcastIndexApi.API_SECRET + str(epoch_time)
        # which is then sha-1'd
        sha_1 = hashlib.sha1(data_to_hash.encode()).hexdigest()

        # now we build our request headers
        headers = {
            'X-Auth-Date': str(epoch_time),
            'X-Auth-Key': PodcastIndexApi.API_KEY,
            'Authorization': sha_1,
            'User-Agent': 'postcasting-index-python-cli'
        }

        return headers

    @staticmethod
    def _fetch(query):
        url = PodcastIndexApi.BASE_URL + query
        resp = requests.get(url, headers=PodcastIndexApi._get_request_header())
        if resp.status_code == 200:
            print(resp)
        return resp

    @staticmethod
    def get_podcast_by_id(id: int) -> PodcastIndexFeed | None:
        """

        :param id: podcast/feed id
        """
        query = f"podcasts/byfeedid?id={id}"
        resp = PodcastIndexApi._fetch(query)
        if resp.status_code == 200:
            content = json.loads(resp.text)
            if len(content["feed"]) == 0:
                # TODO: handle
                print("Not found")
                return
            podcast_attr = content["feed"]
            podcast = PodcastIndexFeed(
                id=podcast_attr["id"],
                title=podcast_attr["title"],
                last_parse_time=podcast_attr["lastParseTime"]
            )
            return podcast
        else:
            # TODO: error handling
            pass

    @staticmethod
    def get_episode_by_id(id: int) -> PodcastIndexEpisode | None:
        """

        :param id: episode id
        """
        query = f"episodes/byid?id={id}"
        resp = PodcastIndexApi._fetch(query)
        if resp.status_code == 200:
            content = json.loads(resp.text)
            if len(content["episode"]) == 0:
                # TODO: handle
                print("Not found")
                return
            episode_attr = content["episode"]
            episode = PodcastIndexEpisode(
                id=episode_attr["id"],
                title=episode_attr["title"],
                feed_id=episode_attr["feedId"],
                published_at=episode_attr["datePublished"],
                transcript_url=episode_attr.get("transcriptUrl"),
                transcripts=episode_attr.get("transcripts")
            )
            return episode
        else:
            # TODO: error handling
            pass

    @staticmethod
    def get_episodes_by_podcast_id(podcast_id: int, since=0) -> List[PodcastIndexEpisode]:
        """

        :param podcastId: podcast/feed id
        """
        query = f"/episodes/byfeedid?id={podcast_id}&since={since}"
        resp = PodcastIndexApi._fetch(query)
        episodes = []
        if resp.status_code == 200:
            content = json.loads(resp.text)
            for episode_attr in content["items"]:
                episode = PodcastIndexEpisode(
                    id=episode_attr["id"],
                    title=episode_attr["title"],
                    feed_id=episode_attr["feedId"],
                    published_at=episode_attr["datePublished"],
                    transcript_url=episode_attr.get("transcriptUrl"),
                    transcripts=episode_attr.get("transcripts")
                )
                episodes.append(episode)
        else:
            # TODO: error handling
            pass
        return episodes

    @staticmethod
    def search_podcasts_by_title(title: str) -> List[PodcastIndexFeed]:
        """

        :param title: podcast title
        """
        query = f"search/bytitle?q={title}"
        resp = PodcastIndexApi._fetch(query)
        podcasts = []
        if resp.status_code == 200:
            content = json.loads(resp.text)

            for podcast_attr in content["feeds"]:
                podcast = PodcastIndexFeed(
                    id=podcast_attr["id"],
                    title=podcast_attr["title"],
                    last_parse_time=podcast_attr["lastParseTime"]
                )
                podcasts.append(podcast)
        else:
            # TODO: error handling
            pass
        return podcasts
