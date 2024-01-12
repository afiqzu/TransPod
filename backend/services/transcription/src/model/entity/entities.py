from dataclasses import dataclass
from enum import Enum
from typing import List


class TranscriptStatus(Enum):
    IDLE = "idle"
    COMPLETED = "completed"


class SummaryStatus(Enum):
    IDLE = "idle"
    APPROVED = "approved"
    COMPLETED = "completed"


class PodcastCatalogEntity:
    def __init__(self, id: int, title: str, original_title: str, last_scraped_at: int):
        self.id = id
        self.title = title
        self.original_title = original_title
        self.last_scraped_at = last_scraped_at


@dataclass
class TranscriptEntryEntity:
    content: str
    speaker: str
    time: str


@dataclass
class SummaryEntryEntity:
    header: str
    content: str


@dataclass
class EpisodeEntity:
    id: int
    podcast_id: int
    transcript: List[TranscriptEntryEntity]
    summary: List[SummaryEntryEntity]
    created_at: int


class PodcastIndexEpisodeEntity:
    def __init__(self, id: int, title: str, original_title: str, podcast_id: int, podcast_title: str,
                 original_podcast_title: str, transcript_url: str, other_transcript_url: str, published_at: int,
                 transcript_status: TranscriptStatus, summary_status: SummaryStatus):
        self.id = id
        self.title = title
        self.original_title = original_title
        self.podcast_id = podcast_id
        self.podcast_title = podcast_title
        self.original_podcast_title = original_podcast_title
        self.transcript_url = transcript_url
        self.other_transcript_url = other_transcript_url
        self.published_at = published_at
        self.transcript_status = transcript_status
        self.summary_status = summary_status
