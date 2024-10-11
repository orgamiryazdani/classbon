import { Comment } from "@/types/comment.interface";

export interface CourseCommentList {
    data: Comment[],
    nextPage: number;
} 