import {PodcastTrending} from "@/types";
import BASE_URL from "@/lib/podcast-index/config.ts";

export async function searchByTerm(term: string | undefined) {
    try {
        const response = await fetch(BASE_URL +`/search?term=${term}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const results = await response.json();
        console.log(results.feeds)
        return results.feeds;
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        throw error;
    }
}

export async function podcastsTrending() {
    try {
        const response = await fetch(BASE_URL + `/trending`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const results = await response.json();
        return results.feeds.map((podcast:PodcastTrending) => ({
            id: podcast.id,
            author: podcast.author,
            title: podcast.title,
            artwork: podcast.artwork
        }));
    } catch (error) {
        console.error('Error fetching trending podcasts:', error);
        throw error;
    }
}
