export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuthUser: () => Promise<boolean>;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
};

export type INewUser = {
  name: string;
  email: string;
  password: string;
};

export type PodcastTrending = {
  id: string;
  author: string;
  title: string;
  artwork: string;
};

export type PodcastSearch = {
  id: string;
  author: string;
  title: string;
  description: string;
  artwork: string;
  categories: string[];
};

export type PodcastDetails = {
  id: string;
  author: string;
  title: string;
  description: string;
  artwork: string;
  episodeCount: string;
};

export type PodcastsHistory = {
  podcastId: string;
  title: string;
  imageUrl: string;
};

export type Episode = {
  id: string;
  title: string;
  datePublishedPretty: string;
  duration?: number;
};

export type EpisodeDetails = {
  podcastName: string;
  episodeId: string;
  image: string;
  title: string;
  description: string;
};

export type Message = {
  role: string;
  content: string | undefined | null;
};
