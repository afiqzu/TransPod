import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "@/lib/appwrite/api.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { INewUser } from "@/types";
import {
  getEpisodesByFeedId,
  getEpisodesById,
  getPodcastById,
  podcastsTrending,
  searchByTerm,
} from "@/lib/podcast-index/api.ts";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOutAccount(),
  });
};

export const useSearchByTerm = (term: string | undefined) => {
  return useQuery({
    queryKey: ["searchByTerm", term],
    queryFn: () => searchByTerm(term),
    enabled: !!term,
  });
};

export const useGetTrending = () => {
  return useQuery({
    queryKey: ["podcastsTrending"],
    queryFn: () => podcastsTrending(),
  });
};

export const useGetPodcastById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getPodcastById", id],
    queryFn: () => getPodcastById(id),
    enabled: !!id,
  });
};

export const useGetEpisodesByFeedId = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getEpisodesByFeedId", id],
    queryFn: () => getEpisodesByFeedId(id),
    enabled: !!id,
  });
};

export const useGetEpisodesById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getEpisodesById", id],
    queryFn: () => getEpisodesById(id),
    enabled: !!id,
  });
};
