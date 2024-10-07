import { Badge } from "@/app/_components/badge";
import { IconArrowLeftFill, IconClock } from "@/app/_components/icons/icons";
import { Price } from "@/app/_components/price/price";
import { CourseSummary } from "@/types/course-summery.interface";
import Image from "next/image";
import Link from "next/link";

export type CourseCardProps = CourseSummary & {};

const CourseLevelFake = {
  Beginners: 0,
  Intermediate: 1,
  Advance: 2,
};

export const fakeData = {
  id: 5,
  coverImageId: 20229,
  title: "معماری پروژه های Large-Scale در ری‌اکت با استفاده از Next.js",
  subTitle:
    "دوره پیشرفته معماری پروژه های Large-Scale در ری‌اکت با استفاده از Next.js - React Query - Zustand - Typescript - Tailwind Css - Mock Service Worker - Storybook - Jest - React Testing Library - Cypress - CI/CD",
  level: "پیشرفته",
  recordStatus: "تکمیل ضبط",
  basePrice: 1000,
  levelNumber: CourseLevelFake.Beginners,
  duration: "40 ساعت",
  slug: "View course details",
  averageReviewRating: 1,
  numOfReviews: 1,
  courseCategoryId: 1,
  isFree: false,
};

export const CourseCard: React.FC<CourseCardProps> = ({
  coverImageId,
  title,
  subTitle,
  level,
  recordStatus,
  basePrice,
  duration,
  slug,
}: CourseCardProps) => {
  return (
    <div className='card'>
      <figure>
        <Image
          src={`https://api.classbon.com/api/picture/${coverImageId}`}
          alt={title}
          width={550}
          height={327}
        />
      </figure>
      <div className='mt2 flex gap-2 font-semibold dark:text-info px-3 py-2'>
        <Badge variant='info'>{recordStatus}</Badge>
        <Badge variant='accent'>{level}</Badge>
      </div>
      <div className='card-body'>
        <Link href={`/course/${slug}`}>{title}</Link>
        <p>{subTitle}</p>
        <div className="flex items-center justify-between mt-3">
          <Badge variant='warning'>
            <IconClock
              width={16}
              height={16}
            />{" "}
            {duration}
          </Badge>
          <Price price={basePrice} size="small"/>
        </div>
      </div>
      <Link
        href={`/course/${slug}`}
        className='card-footer justify-center animated-icon'>
        مشاهده جزئیات دوره
        <IconArrowLeftFill fill='currentColor' />
      </Link>
    </div>
  );
};
