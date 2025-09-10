import { User } from "../index";
import { Post } from "../post/post";

export interface Comment {
    id: number;
    comment: string;
    user: User;
    post: Post;
    created_at: string;
    updated_at: string;
}