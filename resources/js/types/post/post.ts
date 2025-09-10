import { User } from "../index";
import { Comment } from "../comment/comment";

export interface Post {
    id: number;
    title: string;
    content: string;
    user: User;
    comments: Comment[];
    created_at: string;
    updated_at: string;
}

