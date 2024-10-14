import { createData } from "@/core/http-service/http-service";
import { SignIn } from "../types/signin.types";
import { useMutation } from "@tanstack/react-query";

const signin = (model: SignIn): Promise<void> => createData<SignIn, void>('/signin', model)

type useSignInOptions = {
    onSuccess?: () => void;
}

export const useSignIn = ({ onSuccess }: useSignInOptions) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: signin,
        onSuccess: onSuccess,
    });

    return {
        submit,
        isPending
    }
}