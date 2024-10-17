import NextAuth, { CredentialsSignin } from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { createData } from "./core/http-service/http-service";
import { VerifyUserModel } from "./app/(auth)/verify/_types/verify-user.type";
import { User, UserSession, UserToken } from "./types/user.interface";
import { API_URL } from "./configs/global";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { Problem } from "./types/http-errors.interface";

declare module "next-auth" {
    interface User {
        accessToken: string;
    }

    interface Session {
        user: UserSession;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: UserToken;
    }
}

export class AuthorizeError extends CredentialsSignin {
    problem: Problem;
    constructor(err: Problem) {
        super();
        this.problem = err;
    }
}

export const {
    signIn,
    signOut,
    auth,
    handlers: { GET, POST },
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text" },
                code: { label: "code", type: "text" },
            },
            async authorize(credentials) {
                try {
                    const user = await createData<VerifyUserModel, User>(
                        `${API_URL}/verify`,
                        {
                            username: credentials.username as string,
                            code: credentials.code as string,
                        }
                    );
                    // Auth.js expects the user object to be returned
                    return {
                        accessToken: user.token,
                    };
                } catch (error: unknown) {
                    throw new AuthorizeError(error as Problem);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = jwtDecode<UserToken>(user.accessToken);
                token.user.accessToken = user.accessToken;
            }

            return token;
        },
        async session({ session, token }) {
            console.log(token);
            Object.assign(session.user, token.user ?? {});
            return session;
        },
    },
});