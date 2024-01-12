import os
import time

from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, NumberAttribute, MapAttribute, ListAttribute

DYNAMODB_REGION = os.getenv('DYNAMODB_REGION')
DYNAMODB_HOST = os.getenv('DYNAMODB_HOST')


class TranscriptEntry(MapAttribute):
    content = UnicodeAttribute()
    speaker = UnicodeAttribute(null=True)
    time = UnicodeAttribute(null=True)


class SummaryEntry(MapAttribute):
    header = UnicodeAttribute()
    content = ListAttribute(of=UnicodeAttribute)


# store podcasts to scrape
class PodcastCatalogDao(Model):
    class Meta:
        table_name = "podcast_catalog_tab"
        region = DYNAMODB_REGION
        host = DYNAMODB_HOST

    # Podcast Index podcast/feed id
    id = NumberAttribute(hash_key=True)
    # Reformatted title
    title = UnicodeAttribute()
    original_title = UnicodeAttribute()
    # Unix timestamp in seconds
    last_scraped_at = NumberAttribute(default=0)


# store scraped episode transcripts and summaries
class EpisodeTranscriptDao(Model):
    class Meta:
        table_name = "episode_tab"
        region = DYNAMODB_REGION
        host = DYNAMODB_HOST

    # Podcast Index episode id
    id = NumberAttribute(hash_key=True)
    podcast_id = NumberAttribute()

    transcript = ListAttribute(of=TranscriptEntry, null=True)
    summary = ListAttribute(of=SummaryEntry, null=True)

    # Unix timestamp in seconds
    created_at = NumberAttribute(default=int(time.time()))


# store all cataloged episodes available on Podcast Index
# used as a reference to decide which episodes to crawl and summarize
class PodcastIndexEpisodeDao(Model):
    class Meta:
        table_name = "podcast_index_episode_tab"
        region = DYNAMODB_REGION
        host = DYNAMODB_HOST

    # basic attributes
    id = NumberAttribute(hash_key=True)
    title = UnicodeAttribute()
    original_title = UnicodeAttribute()
    podcast_id = NumberAttribute()
    podcast_title = UnicodeAttribute()
    original_podcast_title = UnicodeAttribute()

    # transcript urls
    # Podcast Index transcript url
    transcript_url = UnicodeAttribute(null=True)
    # url used for custom crawling
    other_transcript_url = UnicodeAttribute(null=True)

    # Unix timestamp in seconds when the episode is published (based on Podcast Index)
    published_at = NumberAttribute()

    # job status
    # idle, completed
    transcript_status = UnicodeAttribute(default="idle")
    # idle, approved, running, completed
    summary_status = UnicodeAttribute(default="idle")


# scrap all the episode transcript urls
class CustomEpisodeUrlDao(Model):
    class Meta:
        table_name = "episode_url_tab"
        region = DYNAMODB_REGION
        host = DYNAMODB_HOST

    # reformatted titles
    episode_title = UnicodeAttribute(hash_key=True)
    podcast_title = UnicodeAttribute(range_key=True)
    transcript_url = UnicodeAttribute()
