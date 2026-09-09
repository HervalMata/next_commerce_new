import NextAuth from "next-auth";
import {authConfig} from "@/auth.config";
import {NextResponse} from "next/server";
import { homePathForRole } from "@/lib/roles"

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const session = req.auth;
    const isLoggedIn = !!session?.user;
    const role = session?.user?.role;
    const vendorStatus = session?.user?.vendorStatus ?? null;
    const path = nextUrl.pathname;

    const to = (p: string) => NextResponse.redirect(new URL(p, nextUrl));
    const home = () => to(homePathForRole(role, vendorStatus));

    if (path.startsWith("/login")) {
        if (!isLoggedIn) return to("/login")
        if (role !== "CUSTOMER") return home()
    }

    if (path.startsWith("/vendor/login")) {
        if (!isLoggedIn) return to("/vendor/login")
        if (role !== "VENDOR") return home()
        if (vendorStatus === "APPROVED") return to("/vendor/pending")
    }

    if (path === "/vendor/pending") {
        if (!isLoggedIn) return to("/vendor/login")
        if (role !== "VENDOR") return home()
        if (vendorStatus === "APPROVED") return to("/vendor/login")
    }

    if (path.startsWith("/admin") && path !== "/admin/login") {
        if (!isLoggedIn) return to("/admin/login")
        if (role !== "ADMIN") return home()
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/login", "/vendor/:path", "/admin/:path"]
}
