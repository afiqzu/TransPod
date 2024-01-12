from pydantic import BaseModel


class UpdatePodcastIndexEpisodeDto(BaseModel):
    id: int
    title: str
    other_transcript_url: str | None = None


class PodcastIndexEpisodeDto(BaseModel):
    id: int
    title: str
    original_title: str
    podcast_id: int
    podcast_title: str
    original_podcast_title: str
    transcript_url: str | None = None
    other_transcript_url: str | None = None
    published_at: int
    transcript_status: str
    summary_status: str
