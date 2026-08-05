import { Genre } from "./genre";
export interface Movie { 
    id: number,
    tmdbId:number,
    title: string,
    overview: string,
    tagline:string,
    poster: string,
    releaseDate: string,
    vote: number,
    originalTitle:string,
    backdrop:string,
    runtime: number,
    status: string,
    voteCount:number,
    popularity: number,
    homepage:string,
    favorites:boolean,
    added_at?:string,
    imdbId:string,
    genres: Genre[],
    productionCompanies:Companies[],
    spokenLanguages:Languages[],
    actors: Actor[],
    director:Director,
    writers:Writter[],
    trailer:Trailer,
    images:Images,
    similarMovies: Similar[],
    recommendedMovies: Similar[],
    reviews:Review[],
    keywords:Keyword[]
}

export interface Companies {
    id:number,
    name:string,
    logo:string
}

export interface Languages {
    iso:string,
    name:string
}

export interface Actor {
    id:number,
    name: string,
    character: string,
    profile:string
}

export interface Director {
    adult: boolean,
    gender: number,
    id:number,
    known_for_department: string,
    name: string,
    original_name:string,
    popularity: number,
    profile_path:string,
    credit_id: string,
    department: string,
    job: string
}

export interface Writter {
    id: number,
    name:string,
}

export interface Trailer { 
    iso_639_1: string,
    iso_3166_1: string,
    name:string,
    key:string,
    site:string,
    size:string,
    type:string,
    official:boolean,
    id:string,
    published_at:string
}

export interface Images {
    posters: string[],
    backdrops: string[],
}

export interface Similar{
    tmdbId: number,
    title:string,
    poser:string,
    releaseDate:string,
    vote:string
}

export interface Review { 
    id: string,
    author: string,
    rating:number,
    avatar:string,
    content:string,
    createdAt: string
}

export interface Keyword {
    id: number,
    name: string
}

export interface ProductionCountry {
    iso: string,
    name: string
}

export interface SimilarMovie {
    tmdbId: number,
    title: string,
    poster: string | null,
    releaseDate: string,
    vote: number
}

export interface Collection {
    id: number,
    name: string,
    poster: string | null,
    backdrop: string | null
}

export interface WatchProvider {
    id: number,
    name: string,
    logo: string | null
}

export interface WatchProviders {
    link?: string,
    flatrate?: WatchProvider[],
    rent?: WatchProvider[],
    buy?: WatchProvider[]
}

// Full payload returned by GET /movies/:id -> { movie: MovieDetail }
export interface MovieDetail {
    tmdbId: number,
    title: string,
    originalTitle: string,
    overview: string,
    tagline: string,
    poster: string | null,
    backdrop: string | null,
    releaseDate: string,
    runtime: number,
    status: string,
    vote: number,
    myVote: number | null,
    voteCount: number,
    popularity: number,
    homepage: string,
    imdbId: string,
    adult: boolean,
    video: boolean,
    budget: number,
    revenue: number,
    originalLanguage: string,
    originCountry: string[],
    certification: string | null,
    collection: Collection | null,
    genres: Genre[],
    productionCompanies: Companies[],
    productionCountries: ProductionCountry[],
    spokenLanguages: Languages[],
    actors: Actor[],
    director: Director | null,
    writers: Writter[],
    trailer: Trailer | null,
    videos: Trailer[],
    images: Images,
    externalIds: {
        imdb: string | null,
        facebook: string | null,
        instagram: string | null,
        twitter: string | null,
        wikidata: string | null
    },
    watchProviders: WatchProviders | null,
    similarMovies: SimilarMovie[],
    recommendedMovies: SimilarMovie[],
    reviews: Review[],
    keywords: Keyword[]
}