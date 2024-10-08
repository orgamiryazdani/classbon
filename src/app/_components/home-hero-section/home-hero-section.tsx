import Image from "next/image";
import { Button } from "../button";
import { IconArrowLeftFill } from "../icons/icons";

export const HomeHeroSection: React.FC = () => {
  return (
    <section className='bg-hero-pattern bg-no-repeat bg-center mt-5 xl:mt-20 xl:bg-left'>
      <div className='container flex flex-col-reverse items-center xl:flex-row'>
        <div className='flex flex-col gap-5 mt-12 pb-5 text-center xl:text-right'>
          <h3 className='text-xl dark:text-info xl:text-right'>
            خوش اومدی به ...
          </h3>
          <h1 className='text-3xl lg:text-3xl xl:text-5xl gradient font-black'>
            مسیر صعودبه قله های برنامه نویسی
          </h1>
          <p className='text-lg font-bold leading-8'>
            هر جای مسیر برنامه نویسی که باشی با همراهی استاد های با تجربه کلاسبن
            می تونی بدون محدودیت به قله های بالاتر صعود کنی. ما همیشه هواتو
            داریم.
          </p>
          <div className='mt-5 flex gap-4 justify-center xl:justify-start'>
            <Button
              variant='primary'
              size='large'>
              دوره های ریکت و نکست
              <IconArrowLeftFill fill="currentColor"/>
            </Button>
            <Button
              variant='neutral'
              size='large'>
              مشاوره برنامه نویسی
            </Button>
          </div>
          <Image
            src='/images/frameworks.png'
            className='grayscale mt-4 opacity-70 m-auto xl:m-0'
            width={412}
            height={39}
            alt=''
          />
        </div>
        <Image
          src='images/programmer-landing.svg'
          width={702}
          height={521}
          alt='classbon'
        />
      </div>
    </section>
  );
};
