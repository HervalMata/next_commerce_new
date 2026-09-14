import {ReactNode} from "react";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {homePathForRole} from "@/lib/roles";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    const session = await auth()
    if (session?.user) {
        redirect(homePathForRole(session.user.role, session.user.vendorStatus))
    }
    return <>{children}</>
}
