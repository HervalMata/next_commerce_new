"use server"

import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {Prisma, type BrandStatus} from "@prisma/client";
import {ActionResult, BrandDetail, BrandListItem, BrandListResult, BrandsQuery} from "@/lib/brand-types";
import {brandCreateSchema, brandUpdateSchema} from "@/lib/brand-validation";
import {saveBrandImage, deleteeBrandImage, ImageValidationError} from "@/lib/brand-upload";
import {revalidatePath} from "next/cache";

async function requireAdmin(): Promise<{ success: false; error: string} | null> {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        return {success: false, error: "You don't have permission to use this action."};
    }

    return null
}

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60) || "Brand"
}

async function uniqueBrandSlug(name: string, excludeId?: string): Promise<string> {
    const base = slugify(name)
    let slug = base
    let n = 1
    while (true) {
        const existing = await prisma.brand.findUnique({ where: { slug }, select: { id: true } })
        if (!existing || existing.id === excludeId) break
        slug = `${base}-${n++}`
    }
    return slug
}

async function countBrandProducts(_brandId: string): Promise<number> {
    return 0
}

export async function createBrand(
    _prev: ActionResult | undefined,
    formData: FormData
) : Promise<ActionResult<BrandListItem>> {
    const denied = await requireAdmin()
    if (denied) return denied

    const parsed = brandCreateSchema.safeParse({
        name: formData.get("name"),
        status: formData.get("status"),
        image: formData.get("image"),
    })

    if (!parsed.success) {
        const flat = parsed.error.flatten().fieldErrors
        const fieldErrors: Record<string, string> = {}
        for (const [k, v] of Object.entries(flat)) if (v?.[0] ) fieldErrors[k] = v[0]
        return { success: false, error: "Por favor conserte os erros abaixo.", fieldErrors }
    }

    const { name, status, image} = parsed.data

    let imagePath: string | null = null

    try {
        imagePath = await saveBrandImage(image)
    } catch (e) {
        if (e instanceof ImageValidationError) {
            return {success: false, fieldErrors: { image: e.message }, error: "Por favor conserte os erros abaixo."};
        }
        return { success: false, error: "Não foi possivel processar a imagem.Por favor tente novamente." };
    }

    try {
        const slug = await uniqueBrandSlug(name)
        const brand = await prisma.brand.create({
            data: { name, slug, status: status as BrandStatus, image: imagePath },
        })
        revalidatePath("/admin/brands")
        return { success: true, data: { ...brand, productCount: 0 } }
    } catch (error) {
        await deleteeBrandImage(imagePath)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return { success: false, error: "Uma marca com mesmo nome já existe", fieldErrors: { email: "Uma marca com mesmo nome já existe" }}
        }
        return { success: false, error:  "Something went wrong. Please try again" }
    }

}

export async function updateBrand(
    id: string,
    _prev: ActionResult | undefined,
    formData: FormData
) : Promise<ActionResult<BrandListItem>> {
    const denied = await requireAdmin()
    if (denied) return denied

    const existing = await prisma.brand.findUnique({ where: { id } })
    if (!existing) return { success: false, error: "Esta marca não existe main"}

    const parsed = brandUpdateSchema.safeParse({
        name: formData.get("name"),
        status: formData.get("status"),
        image: formData.get("image"),
    })

    if (!parsed.success) {
        const flat = parsed.error.flatten().fieldErrors
        const fieldErrors: Record<string, string> = {}
        for (const [k, v] of Object.entries(flat)) if (v?.[0] ) fieldErrors[k] = v[0]
        return { success: false, error: "Por favor conserte os erros abaixo.", fieldErrors }
    }

    const { name, status, image} = parsed.data

    let newImagePath: string | null = null

    try {
        newImagePath = await saveBrandImage(image!)
    } catch (e) {
        if (e instanceof ImageValidationError) {
            return {success: false, fieldErrors: { image: e.message }, error: "Por favor conserte os erros abaixo."};
        }
        return { success: false, error: "Não foi possivel processar a imagem.Por favor tente novamente." };
    }

    try {
        const slug = name === existing.name ? existing.slug : await uniqueBrandSlug(name)
        const brand = await prisma.brand.update({
            where: { id },
            data: { name, slug, status: status as BrandStatus, ...(newImagePath ? { image: newImagePath } : {} ),}
        })

        if (newImagePath && existing.image) await deleteeBrandImage(existing.image)
        revalidatePath("/admin/brands")
        revalidatePath(`/admin/brands/${id}`)
        return { success: true, data: { ...brand, productCount: await countBrandProducts(id) } }
    } catch (error) {
        if (newImagePath) await deleteeBrandImage(newImagePath)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return { success: false, error: "Uma marca com mesmo nome já existe", fieldErrors: { email: "Uma marca com mesmo nome já existe" }}
        }
        return { success: false, error:  "Something went wrong. Please try again" }
    }

}

export async function deleteBrand(
    id: string,
) : Promise<ActionResult> {
    const denied = await requireAdmin()
    if (denied) return denied

    const brand = await prisma.brand.findUnique({ where: { id } })
    if (!brand) return { success: false, error: "Esta marca não existe main"}

    const productCount = await countBrandProducts(id)

    if (productCount > 0) {
        return {
            success: false,
            error: `Esta marca é usada por ${productCount} produto${productCount === 1 ? "" : "s"}. 
                     Retorne ou remova este produtos primeiro, ou desative a marca ao invés de remove-la.`,
        }
    }

    try {
        await prisma.brand.delete({ where: { id } })
        await deleteeBrandImage(brand.image)
        revalidatePath("/admin/brands")
        revalidatePath(`/admin/brands/${id}`)
        return { success: true }
    } catch {
        return { success: false, error:  "Something went wrong. Please try again" }
    }

}

export async function toggleBrandStatus(
    id: string,
) : Promise<ActionResult<{ status: BrandStatus }>> {
    const denied = await requireAdmin()
    if (denied) return denied

    const brand = await prisma.brand.findUnique({ where: { id }, select: { status: true } })
    if (!brand) return { success: false, error: "Esta marca não existe main"}

    const next: BrandStatus = brand.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"

    try {
        await prisma.brand.update({ where: { id }, data: { status: next } })
        revalidatePath("/admin/brands")
        return { success: true }
    } catch {
        return { success: false, error:  "Couldn't update the status. Please try again" }
    }

}

export async function getBrands(
    query: BrandsQuery = {},
) : Promise<ActionResult<BrandListResult>> {
    const denied = await requireAdmin()
    if (denied) return denied

    const search = (query.search ?? "").trim()
    const statusFilter = query.status ?? "ALL"
    const page = Math.max(1, query.page ?? 1)
    const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 10))

    const where: Prisma.BrandWhereInput = {
        ...(search ? { name: { contains: search } } : {}),
        ...(statusFilter !== "ALL" ? { status: statusFilter as BrandStatus } : {})
    }

    try {
        const [total, rows] = await Promise.all([
            prisma.brand.count({ where }),
            prisma.brand.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
            })
        ])
        const brands : BrandListItem[] = rows.map((b) => ({ ...b, productCount: 0 }))

        return {
            success: true,
            data: {
                brands,
                total,
                page,
                pageSize,
                totalPages: Math.max(1, Math.ceil(total / pageSize))
            }
        }
    } catch {
        return { success: false, error:  "Couldn't load brands. Please try again" }
    }

}

export async function getBrand(
    id: string,
) : Promise<ActionResult<BrandDetail>> {
    const denied = await requireAdmin()
    if (denied) return denied

    const brand = await prisma.brand.findUnique({ where: { id } })
    if (!brand) return { success: false, error: "Esta marca não existe main"}

    const detail: BrandDetail = {
        ...brand,
        productCount: 0,
        activeProducts: 0,
        inactiveProducts: 0,
        products: []
    }

    return { success: false, data:  detail }


}
