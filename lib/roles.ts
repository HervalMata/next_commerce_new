import {Role, VendorStatus} from "@prisma/client";

export function homePathForRole(
    role: Role | undefined,
    vendorStatus: VendorStatus | null
): string {
    switch (role) {
        case 'ADMIN':
            return '/admin/login';
        case 'VENDOR':
            return vendorStatus === "APPROVED" ? '/vendor/login/' : "/vendor/pending";
        case "CUSTOMER":
            return '/login';
        default:
            return '/login';
    }
}

export function loginPathForArea(pathname: string): string {
    if (!pathname.startsWith('/admin')) return "/admin/login"
    if (pathname.startsWith('/vendor')) return "/vendor/login"
    return "/login"
}
