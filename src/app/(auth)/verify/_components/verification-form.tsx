"use client";
import AuthCode from "@/app/_components/auth-code/auth-code";
import { AuthCodeRef } from "@/app/_components/auth-code/auth-code.types";
import { Button } from "@/app/_components/button/button";
import { Timer } from "@/app/_components/timer/timer";
import { TimerRef } from "@/app/_components/timer/timer.types";
import Link from "next/link";
import { useRef, useState } from "react";
import { useSendAuthCode } from "../_api/send-auth-code";
import { useNotificationStore } from "@/stores/notification.store";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { VerifyUserModel } from "../_types/verify-user.type";

const getTwoMinutesFromNow = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5);
  return time;
};

const VerificationForm = () => {
  const [showResendCode, setShowResendCode] = useState<boolean>(false);
  const authCodeRef = useRef<AuthCodeRef>(null);
  const timerRef = useRef<TimerRef>(null);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { isValid },
  } = useForm<VerifyUserModel>();

  const showNotifications = useNotificationStore(
    (state) => state.showNotification,
  );

  const params = useSearchParams();
  const username = params.get("mobile")!;

  const sendAuthCode = useSendAuthCode({
    onSuccess: () => {
      showNotifications({
        type: "info",
        message: "کد تایید به شماره شما ارسال شد",
      });
    },
  });

  const onSubmit = (data: VerifyUserModel) => {
    data.username = username;
    console.log(data);
  };

  register("code", {
    validate: (value: string) => (value ?? "").length === 5,
  });

  const resendAuthCode = () => {
    timerRef.current?.restart(getTwoMinutesFromNow());
    setShowResendCode(false);
    sendAuthCode.submit(username);
    authCodeRef.current?.clear();
  };

  return (
    <>
      <h5 className='text-2xl'>کد تایید</h5>
      <p className='mt-2'>دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 mt-10 flex-1'>
        <AuthCode
          className='mt-10'
          ref={authCodeRef}
          onChange={(value) => {
            setValue("code", value, { shouldValidate: true });
          }}
        />
        <Timer
          expiryTimestamp={getTwoMinutesFromNow()}
          onExpire={() => setShowResendCode(true)}
          showDays={false}
          showHours={false}
          className='my-8'
          size='small'
          ref={timerRef}
        />
        <Button
          isLink={true}
          onClick={resendAuthCode}
          isDisabled={!showResendCode}>
          ارسال مجدد کد تایید
        </Button>
        <Button
          isDisabled={!isValid}
          type='submit'
          variant='primary'>
          تایید و ادامه
        </Button>
        <div className='flex items-start gap-1 justify-center mt-auto'>
          <span>برای اصلاح شماره موبایل</span>
          <Link href='/signin'>اینجا</Link>
          <span>کلیک کنید</span>
        </div>
      </form>
    </>
  );
};

export default VerificationForm;
