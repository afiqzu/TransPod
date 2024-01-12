from typing import List

from pydantic import BaseModel


class TranscriptEntryDto(BaseModel):
    content: str
    speaker: str | None = None
    time: str | None = None


class SummaryEntryDto(BaseModel):
    header: str | None = None
    content: str


class EpisodeDto(BaseModel):
    id: int
    podcast_id: int
    transcript: List[TranscriptEntryDto] | None = None
    summary: List[SummaryEntryDto] | None = None
    created_at: int
