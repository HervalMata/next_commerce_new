import {Role, VendorStatus} from "@prisma/client";
import {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface User {
        role: Role;
        vendorId?: string | null;
        vendorStatus: VendorStatus | null;
    }

    interface Session {
        user: {
            id: string;
            role: Role;
            vendorId: string | null;
            vendorStatus: VendorStatus | null;
        } & DefaultSession["user"]
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        id: string;
        role: Role;
        vendorId: string | null;
        vendorStatus: VendorStatus | null;
    }
}
