import json
from typing import List

import requests
from bs4 import BeautifulSoup


class EpisodeUrlMapping:
    def __init__(self, episode_title: str, podcast_title: str, transcript_url: str):
        self.episode_title = episode_title
        self.podcast_title = podcast_title
        self.transcript_url = transcript_url

    def __repr__(self):
        return f"<{self.__class__.__name__}>: episode_title={self.episode_title}, podcast_title={self.podcast_title}, transcript_url={self.transcript_url}"


class UrlCrawler:
    @staticmethod
    def run() -> List[EpisodeUrlMapping]:
        pass


class ModernDataStackUrlCrawler(UrlCrawler):
    BASE_URL = "https://www.moderndatastack.xyz/podcast/"

    @staticmethod
    def run() -> List[EpisodeUrlMapping]:
        return ModernDataStackUrlCrawler._run_v1() + ModernDataStackUrlCrawler._run_v2()

    @staticmethod
    def _crawl(url: str) -> List[EpisodeUrlMapping]:
        page = requests.get(url)
        soup = BeautifulSoup(page.content, "html.parser")
        component = soup.find(id="__NEXT_DATA__")
        target = json.loads(component.text)
        episodes = target["props"]["pageProps"]["podcasts"]

        episode_url_mappings: List[EpisodeUrlMapping] = []
        for episode in episodes:
            episode_url_mapping = EpisodeUrlMapping(
                episode_title=episode["title"],
                podcast_title="The Modern Data Show",
                transcript_url=ModernDataStackUrlCrawler.BASE_URL + episode["slug"]
            )
            episode_url_mappings.append(episode_url_mapping)
        return episode_url_mappings

    @staticmethod
    def _run_v1() -> List[EpisodeUrlMapping]:
        MAIN_PAGE_URL = "https://www.moderndatastack.xyz/podcast/season/1"
        return ModernDataStackUrlCrawler._crawl(MAIN_PAGE_URL)

    @staticmethod
    def _run_v2() -> List[EpisodeUrlMapping]:
        MAIN_PAGE_URL = "https://www.moderndatastack.xyz/podcast/season/2"
        return ModernDataStackUrlCrawler._crawl(MAIN_PAGE_URL)

# for e in ModernDataStackUrlCrawler.V1.run() + ModernDataStackUrlCrawler.V2.run():
#     episode_url = EpisodeUrl()
#     episode_url.episode_title = e.episode_title
#     episode_url.podcast_title = e.podcast_title
#     episode_url.transcript_url = e.transcript_url
#     episode_url.save()
