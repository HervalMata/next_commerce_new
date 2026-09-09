import {Role} from "@prisma/client";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {homePathForRole} from "@/lib/roles";

export async function requireRole(role: Role, loginPath: string) {
    const session = await auth()
    if (!session?.user) redirect(loginPath)
    if (session.user.role !== role) {
        redirect(homePathForRole(session.user.role, session.user.vendorStatus))
    }
    return session
}
