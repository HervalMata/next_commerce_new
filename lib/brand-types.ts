// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type {Brand} from "@prisma/client";

export type ActionResult<T = undefined> = {
    success: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
    data?: T;
}

export type BrandProductRow = {
    id: string;
    name: string;
    price: number;
    status: string;
    image: string | null;
}

export type BrandListItem = Brand & { productCount: number };

export type BrandListResult = {
    brands: BrandListItem[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export type BrandDetail = Brand & {
    productCount: number;
    activeProducts: number;
    inactiveProducts: number;
    products: BrandProductRow[]
}

export type BrandsQuery = {
    search?: string;
    status?: "ALL" | "ACTIVE" | "INACTIVE";
    page?: number;
    pageSize?: number;
}
