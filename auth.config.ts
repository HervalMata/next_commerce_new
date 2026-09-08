import type {NextAuthConfig} from "next-auth";

export const authConfig = {
    trustHost: true,
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login"
    },
    providers: [],
    callbacks: {
        jwt({ token, user}) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role;
                token.vendorId = user.vendorId ?? null;
                token.vendorStatus = user.vendorStatus ?? null;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.vendorId = token.vendorId ?? null;
                session.user.vendorStatus = token.vendorStatus ?? null;
            }
            return session;
        }
    }
} satisfies NextAuthConfig
