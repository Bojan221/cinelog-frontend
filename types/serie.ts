import { Genre } from "./genre";
import {
    Companies,
    Languages,
    Trailer,
    Images,
    Similar,
    Review,
    Keyword,
} from "./movie";

export interface Serie {
    tmdbId: number,
    title: string,
    overview: string,
    poster: string,
    releaseDate: string,
    vote: number,
    backdrop: string,
    genres: number[]
}

export interface SerieDetail {
    tmdbId: number,
    title: string,
    originalTitle: string,
    overview: string,
    tagline: string,
    poster: string,
    backdrop: string,
    firstAirDate: string,
    lastAirDate: string,
    status: string,
    type: string,
    inProduction: boolean,
    episodeRunTime: number[],
    numberOfSeasons: number,
    numberOfEpisodes: number,
    vote: number,
    voteCount: number,
    popularity: number,
    homepage: string,
    imdbId: string,
    genres: Genre[],
    creators: Creator[],
    networks: Network[],
    productionCompanies: Companies[],
    spokenLanguages: Languages[],
    seasons: Season[],
    lastEpisodeToAir: Episode | null,
    nextEpisodeToAir: Episode | null,
    actors: SerieActor[],
    trailer: Trailer,
    images: Images,
    similarSeries: Similar[],
    recommendedSeries: Similar[],
    reviews: Review[],
    keywords: Keyword[]
}

export interface Creator {
    id: number,
    name: string,
    profile: string | null
}

export interface Network {
    id: number,
    name: string,
    logo: string | null
}

export interface Season {
    id: number,
    name: string,
    overview: string,
    poster: string | null,
    airDate: string,
    seasonNumber: number,
    episodeCount: number,
    vote: number
}

export interface Episode {
    id: number,
    name: string,
    overview: string,
    still: string | null,
    airDate: string,
    episodeNumber: number,
    seasonNumber: number,
    runtime: number,
    vote: number,
    voteCount?: number
}

export interface SeasonWithEpisodes {
    id: number,
    name: string,
    overview: string,
    poster: string | null,
    airDate: string,
    seasonNumber: number,
    vote: number,
    episodes: Episode[]
}

export interface SerieActor {
    id: number,
    name: string,
    character: string,
    episodeCount: number,
    profile: string | null
}
