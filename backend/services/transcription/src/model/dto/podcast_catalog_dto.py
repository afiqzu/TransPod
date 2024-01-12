from pydantic import BaseModel


class PodcastCatalogDto(BaseModel):
    id: int
    title: str
    original_title: str
    last_scraped_at: int
