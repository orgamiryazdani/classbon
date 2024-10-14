/* eslint-disable react/display-name */
"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { AuthCodeProps, AuthCodeRef, AuthInputProps } from "./auth-code.types";
import classNames from "classnames";

const AuthCode = forwardRef<AuthCodeRef, AuthCodeProps>(
  (
    {
      variant = "ghost",
      autoFocus = true,
      isDisabled = false,
      length = 5,
      onChange,
    },
    ref,
  ) => {
    if (length < 1) {
      throw new Error("تعداد ارقام باید بزرگتر از 1 باشد");
    }

    const inputRefs = useRef<Array<HTMLInputElement>>([]);

    const inputProps: AuthInputProps = {
      min: "0",
      max: "9",
      pattern: "[0-9]{1}",
    };

    useEffect(() => {
      if (autoFocus) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const sendResult = () => {
      const result = inputRefs.current.map((input) => input.value).join("");
      onChange(result);
    };

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value, nextElementSibling },
      } = e;

      if (value.match(inputProps.pattern)) {
        if (nextElementSibling !== null) {
          (nextElementSibling as HTMLElement).focus();
        }
      } else {
        e.target.value = "";
      }

      sendResult();
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;

      const target = e.target as HTMLInputElement;
      if (key === "Backspace") {
        if (target.value === "") {
          if (target.previousElementSibling !== null) {
            const previousElement =
              target.previousElementSibling as HTMLInputElement;
            previousElement.value = "";
            previousElement.focus();
          }
        } else {
          target.value = "";
        }
      }
      sendResult();
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRefs.current) {
          inputRefs.current[0].focus();
        }
      },
      clear: () => {
        if (inputRefs.current) {
          for (let i = 0; i < inputRefs.current.length; i++) {
            inputRefs.current[i].value = "";
          }
          inputRefs.current[0].focus();
        }
        sendResult();
      },
    }));

    const classes = classNames("textbox flex-1 w-1 text-center", {
      [`textbox-${variant}`]: variant,
    });

    const inputs = [];
    for (let i = 0; i < length; i++) {
      inputs.push(
        <input
          type='text'
          maxLength={1}
          className={classes}
          disabled={isDisabled}
          onChange={handleOnchange}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          ref={(element: HTMLInputElement) => {
            inputRefs.current[i] = element;
          }}
        />,
      );
    }

    return <div className='flex gap-4 flex-row-reverse'>{inputs}</div>;
  },
);

export default AuthCode;