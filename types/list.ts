import { User } from "./user"

export interface  List {
    id: number,
    name: string,
    user_id: number,
    is_default: number,
    is_public: number,
    created_at: string,
    media_type: string,
    item_count: number,
    user: User
}

export interface ListItem {
    tmdbId: number,
    title: string,
    overview: string,
    poster: string | null,
    releaseDate: string,
    vote: number,
    runtime: number | null,
    type: string,
    added_at: string
}

export interface ListDetail extends List {
    list_items: ListItem[]
}