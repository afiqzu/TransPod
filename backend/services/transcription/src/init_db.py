from model.dao.dao import EpisodeTranscriptDao, PodcastCatalogDao, CustomEpisodeUrlDao, PodcastIndexEpisodeDao


class DB:
    @staticmethod
    def init():
        if not EpisodeTranscriptDao.exists():
            EpisodeTranscriptDao.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)

        if not PodcastCatalogDao.exists():
            PodcastCatalogDao.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)

        if not CustomEpisodeUrlDao.exists():
            CustomEpisodeUrlDao.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)

        if not PodcastIndexEpisodeDao.exists():
            PodcastIndexEpisodeDao.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)

    @staticmethod
    def clear():
        if EpisodeTranscriptDao.exists():
            EpisodeTranscriptDao.delete_table()
        if PodcastCatalogDao.exists():
            PodcastCatalogDao.delete_table()
        if CustomEpisodeUrlDao.exists():
            CustomEpisodeUrlDao.delete_table()
        if PodcastIndexEpisodeDao.exists():
            PodcastIndexEpisodeDao.delete_table()
