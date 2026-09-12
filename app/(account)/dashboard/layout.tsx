import {ReactNode} from "react";
import {requireRole} from "@/lib/guard";

export default async function CustomerDashboardLayout(
    {
        children,
    }: {
        children: ReactNode;
    }
) {
    // await requireRole("CUSTOMER", "/login")
    return <>{children}</>
}
