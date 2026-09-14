import {ReactNode} from "react";
import {requireRole} from "@/lib/guard";

export default async function AdminLayout(
    {
        children,
    }: {
        children: ReactNode;
    }
) {
    await requireRole("ADMIN", "/admin/login")
    return <>{children}</>
}
