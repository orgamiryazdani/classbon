import { CourseDetailsType } from "@/types/course-details.interface";

export type CourseAsideProps = Pick<
    CourseDetailsType,
    | "basePrice"
    | "numberOfLectures"
    | "numOfStudents"
    | "duration"
    | "recordStatus"
    | "isDownloadable"
    | "averageReviewRating"
    | "level"
    | "numOfReviews"
    | "authorName"
    | "authorSpecialty"
    | "profileImageId"
    | "levelNumber"
>;