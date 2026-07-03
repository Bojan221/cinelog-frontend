import { Genre } from "./genre";
export interface Movie { 
    id: number,
    tmdbId:number,
    title: string,
    overview: string,
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
    imdbId:string,
    genres: Genre[],
    productionCompanies:Companies[],
    spokenLanguages:Languages[],
    actors: Actor[],
    director:Director,
    writters:Writter[],
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