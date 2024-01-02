import { INewUser, PodcastsHistory } from "@/types";
import { account, appwriteConfig, databases } from "@/lib/appwrite/config.ts";
import { ID, Models, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );
    if (!newAccount) throw Error;
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

export function signInWithGoogle() {
  console.log("google");
  account.createOAuth2Session(
    "google",
    "http://localhost:5173/home",
    "http://localhost:5173",
  );
}

export async function checkRegisteredUser() {
  const session = await account.get();
  const email = session.email;
  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("email", email)],
  );
  if (user.total === 0) {
    await saveUserToDB({
      accountId: session.$id,
      name: session.name,
      email: session.email,
    });
  }
}

export async function getProviderAccessToken() {
  try {
    const session = await account.getSession("current");
    return session.providerAccessToken;
  } catch (error) {
    console.log(error);
  }
}

export async function addToPodcastHistory(newPodcast: PodcastsHistory) {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("User not found");

  const podcast = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.podcastCollectionId,
    [Query.equal("podcastId", newPodcast.podcastId)],
  );

  if (podcast.total === 0) {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.podcastCollectionId,
      ID.unique(),
      {
        podcastId: newPodcast.podcastId,
        title: newPodcast.title,
        imageUrl: newPodcast.imageUrl,
        viewedBy: [currentUser.$id],
      },
    );
  } else {
    const podcastHistory = currentUser.podcastHistory.map(
      (podcast: Models.Document) => podcast.$id,
    );

    const index = podcastHistory.indexOf(podcast.documents[0].$id);
    if (index !== -1) {
      podcastHistory.splice(index, 1);
    }
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentUser.$id,
      {
        podcastHistory: podcastHistory,
      },
    );

    podcastHistory.unshift(podcast.documents[0].$id);
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentUser.$id,
      {
        podcastHistory: podcastHistory,
      },
    );
  }
}

export async function getPodcastHistory() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("User not found");
  const history = currentUser.podcastHistory.reverse();
  if (history.length > 15) history.length = 15;
  return history;
}
