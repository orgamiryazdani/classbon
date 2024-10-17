"use server";

import { OperationResult } from "@/types/operation-result";
import { serverActionWrapper } from "../server-action-wrapper";
import { createData } from "@/core/http-service/http-service";
import { SendAuthCode, VerifyUserModel } from "@/app/(auth)/verify/_types/verify-user.type";
import { AuthorizeError, signIn, signOut } from "@/auth";
import { SignIn } from "@/app/(auth)/signin/_types/signin.types";

export async function signInAction(
    formState: OperationResult<string> | null,
    formData: FormData
) {
    const mobile = formData.get("mobile") as string;
    // const validatedData = signInSchema.safeParse({
    //     mobile,
    // });

    // if (!validatedData.success) {
    //     return {
    //         message: "خطا در فرمت موبایل",
    //     };
    // } else {
    return serverActionWrapper(
        async () =>
            await createData<SignIn, string>("/signin", {
                mobile,
            })
    );
    // }
}

export async function sendAuthCode(
    formState: OperationResult<string> | null,
    mobile: string
) {
    return serverActionWrapper(
        async () =>
            await createData<SendAuthCode, string>("/send-auth-code", {
                mobile,
            })
    );
}

export async function verify(prevState: OperationResult<void> | undefined, model: VerifyUserModel) {
    try {
        await signIn("credentials", {
            username: model.username,
            code: model.code,
            redirect: false
        });
        return {
            isSuccess: true,
        } satisfies OperationResult<void>
    } catch (error) {
        if (error instanceof AuthorizeError) {
            return {
                isSuccess: false,
                error: error.problem!
            } satisfies OperationResult<void>
        }
        throw new Error('');
    }
}

export async function logout(prevState: OperationResult<void> | undefined) {
    try {
        await signOut({ redirect: false });
        return {
            isSuccess: true,
        } satisfies OperationResult<void>;
    } catch (error) {
        throw new Error("");
    }
}