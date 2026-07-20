import { Genre } from "./genre";
import {
    Companies,
    Languages,
    Trailer,
    Images,
    Review,
    Keyword,
    ProductionCountry,
    WatchProviders,
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

export interface SimilarSerie {
    tmdbId: number,
    title: string,
    poster: string | null,
    releaseDate: string,
    vote: number
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
    adult: boolean,
    originalLanguage: string,
    originCountry: string[],
    languages: string[],
    contentRating: string | null,
    genres: Genre[],
    creators: Creator[],
    networks: Network[],
    productionCompanies: Companies[],
    productionCountries: ProductionCountry[],
    spokenLanguages: Languages[],
    seasons: Season[],
    lastEpisodeToAir: Episode | null,
    nextEpisodeToAir: Episode | null,
    actors: SerieActor[],
    trailer: Trailer | null,
    videos: Trailer[],
    images: Images,
    externalIds: {
        imdb: string | null,
        tvdb: number | null,
        facebook: string | null,
        instagram: string | null,
        twitter: string | null,
        wikidata: string | null
    },
    watchProviders: WatchProviders | null,
    similarSeries: SimilarSerie[],
    recommendedSeries: SimilarSerie[],
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

export interface SeasonCastMember {
    id: number,
    name: string,
    character: string,
    profile: string | null
}

export interface EpisodeGuestStar {
    id: number,
    name: string,
    character: string,
    profile: string | null,
    order: number
}

export interface EpisodeWriterCredit {
    id: number,
    name: string,
    job: string,
    profile: string | null
}

export interface EpisodeDirector {
    id: number,
    name: string,
    job?: string,
    department?: string,
    known_for_department?: string,
    profile_path?: string | null
}

export interface SeasonEpisode {
    id: number,
    name: string,
    overview: string,
    still: string | null,
    airDate: string,
    episodeNumber: number,
    seasonNumber: number,
    episodeType?: string,
    productionCode?: string,
    runtime: number | null,
    vote: number,
    voteCount?: number,
    director: EpisodeDirector | null,
    writers: EpisodeWriterCredit[],
    guestStars: EpisodeGuestStar[]
}

// Full payload from GET /series/:id/season/:seasonNumber -> { season: SeasonDetail }
export interface SeasonDetail {
    id: number,
    name: string,
    overview: string,
    poster: string | null,
    airDate: string,
    seasonNumber: number,
    vote: number,
    cast: SeasonCastMember[],
    images: { posters: string[] },
    videos: Trailer[],
    externalIds: {
        imdb: string | null,
        tvdb: number | null,
        wikidata: string | null
    },
    episodes: SeasonEpisode[]
}
