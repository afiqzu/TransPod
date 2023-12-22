import {Episode, PodcastTrending} from "@/types";
import BASE_URL from "@/lib/podcast-index/config.ts";

export async function searchByTerm(term: string | undefined) {
  try {
    const response = await fetch(BASE_URL + `/search?term=${term}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const results = await response.json();
    return results.feeds;
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    throw error;
  }
}

export async function podcastsTrending() {
  try {
    const response = await fetch(BASE_URL + `/trending`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const results = await response.json();
    return results.feeds.map((podcast: PodcastTrending) => ({
      id: podcast.id,
      author: podcast.author,
      title: podcast.title,
      artwork: podcast.artwork,
    }));
  } catch (error) {
    console.error("Error fetching trending podcasts:", error);
    throw error;
  }
}

export async function getPodcastById(id: string | undefined) {
  try {
    const response = await fetch(BASE_URL + `/podcasts/byfeedid?id=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    const podcast = result.feed;
    return {
      id: podcast.id,
      author: podcast.author,
      title: podcast.title,
      description: podcast.description,
      artwork: podcast.artwork,
      episodeCount: podcast.episodeCount,
    };
  } catch (error) {
    console.error("Error fetching podcast:", error);
    throw error;
  }
}

export async function getEpisodesByFeedId(id: string | undefined) {
  try {
    const response = await fetch(BASE_URL + `/episodes/byfeedid?id=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const results = await response.json();
    return results.items.map((episode: Episode) => ({
      id: episode.id,
      title: episode.title,
      datePublishedPretty: episode.datePublishedPretty,
      duration: episode.duration,
    }));
  } catch (error) {
    console.error("Error fetching trending podcasts:", error);
    throw error;
  }
}

export async function getEpisodesById(id: string | undefined) {
  try {
    const response = await fetch(BASE_URL + `/episodes/byid?id=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const results = await response.json();
    const episode = results.episode
    console.log(episode)
    return {
      podcastName: episode.feedTitle,
      episodeId: episode.id,
      image: episode.feedImage,
      title: episode.title,
      description: episode.description
    };
  } catch (error) {
    console.error("Error fetching trending podcasts:", error);
    throw error;
  }
}