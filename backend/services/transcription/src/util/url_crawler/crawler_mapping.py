from typing import Dict, Type

from util.url_crawler.crawler import ModernDataStackUrlCrawler, UrlCrawler

CRAWLER_MAPPING: Dict[str, Type[UrlCrawler]]= {
    "the_modern_data_show": ModernDataStackUrlCrawler
}
