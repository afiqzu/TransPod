export type IContextType = {
    user: IUser
    isLoading: boolean
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    checkAuthUser: () => Promise<boolean>
}

export type IUser = {
    id: string
    name: string
    username: string
    email: string
}

export type INewUser = {
    name: string
    email: string
    username: string
    password: string
}

export type PodcastTrending = {
    id:string
    author: string
    title: string
    artwork: string
};



export type PodcastSearch = {
    id:string
    author: string
    title: string
    description: string
    artwork: string
    categories: string[]

};
