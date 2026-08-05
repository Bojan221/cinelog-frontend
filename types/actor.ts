export interface ActorMovieCredit {
    tmdbId: number;
    title: string;
    originalTitle: string;
    character: string;
    overview: string;
    poster: string | null;
    backdrop: string | null;
    releaseDate: string;
    vote: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
    order: number;
}

export interface ActorTvCredit {
    tmdbId: number;
    name: string;
    originalName: string;
    character: string;
    overview: string;
    poster: string | null;
    backdrop: string | null;
    firstAirDate: string;
    vote: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
    episodeCount: number;
}

export interface ActorListItem {
    tmdbId: number;
    name: string;
    gender: number;
    profile: string | null;
    knownForDepartment: string;
    popularity: number;
    movieCredits: ActorMovieCredit[];
    tvCredits: ActorTvCredit[];
}

export interface ActorExternalIds {
    imdb: string | null;
    wikidata: string | null;
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    twitter: string | null;
    youtube: string | null;
}

export interface ActorDetail {
    tmdbId: number;
    name: string;
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: number;
    placeOfBirth: string | null;
    profile: string | null;
    knownForDepartment: string;
    homepage: string | null;
    imdbId: string | null;
    popularity: number;
    alsoKnownAs: string[];
    movieCredits: ActorMovieCredit[];
    tvCredits: ActorTvCredit[];
    images: string[];
    externalIds: ActorExternalIds;
}
