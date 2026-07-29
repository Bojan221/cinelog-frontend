import { User } from "./user";

export interface Comment {
    id: number,
    user_id: number,
    content: string,
    tmdb_id: number,
    media_type: "movie" | "tv",
    created_at: string,
    user: User
}
