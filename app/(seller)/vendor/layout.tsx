import {ReactNode} from "react";
import {requireRole} from "@/lib/guard";

export default async function SellerLayout(
    {
        children
    }: {
        children: ReactNode;
    }
) {
    // await requireRole("VENDOR", "/vendor/login")
    return <>{children}</>
}
