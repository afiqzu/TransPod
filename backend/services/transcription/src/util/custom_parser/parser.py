import json
from typing import List

import requests
from bs4 import BeautifulSoup

from model.dao.dao import TranscriptEntry


class Parser():
    @staticmethod
    def run(url: str) -> List[TranscriptEntry]:
        pass


class ModernDataStackParser(Parser):
    @staticmethod
    def run(url: str) -> List[TranscriptEntry]:
        page = requests.get(url)
        soup = BeautifulSoup(page.content, "html.parser")
        component = soup.find(id="__NEXT_DATA__")
        target = json.loads(component.text)
        podcast_attributes = target["props"]["pageProps"]["podcast"]

        return [
            TranscriptEntry(
                content=entry["content"],
                speaker=entry["name"],
                time=entry["time"]
            ) for entry in podcast_attributes["transcript"]
        ]
