"use server"

import {prisma} from "@/lib/prisma";
import {customerRegisterSchema, loginSchema, updateProfileSchema, vendorRegisterSchema} from "@/lib/validation";
import bcrypt from "bcryptjs";
import {Prisma} from "@prisma/client";
import {redirect} from "next/navigation";
import {auth, signIn, signOut} from "@/auth";
import {AuthError} from "next-auth";
import {homePathForRole} from "@/lib/roles";
import {revalidatePath} from "next/cache";

export type FormState = {
    error?: string
    fieldErrors?: Record<string, string>
}

function firstErrors(fieldErrors: Record<string, string[] | undefined>) {
    const out: Record<string, string[]> = {}
    for (const [key, msgs] of Object.entries(fieldErrors)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (msgs && msgs.length) out[key] = msgs[0]

    }
    return out
}

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 50) || "store"
}

async function uniqueSlug(base: string): Promise<string> {
    const root = slugify(base)
    let slug = root
    let n = 1
    while (await prisma.vendor.findUnique({ where: { slug } })) {
        slug = `${root}-${n++}`
    }
    return slug
}

export async function registerCustomer(
    _prev: FormState | undefined,
    formData: FormData
) : Promise<FormState> {
    const parsed = customerRegisterSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!parsed.success) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return { fieldErrors: firstErrors(parsed.error.flatten().fieldErrors) }
    }

    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return { fieldErrors: { email: "An account with this email already exists" }}
    }

    const passwordHash = await bcrypt.hash(password, 12)

    try {
        await prisma.user.create({
            data: { name, email, passwordHash, role: "CUSTOMER" },
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return { fieldErrors: { email: "An account with this email already exists" }}
        }
        return { error:  "Something went wrong. Please try again" }
    }

    await signInOrThrow(email, password)
    redirect("/dashboard")
}

export async function registerVendor(
    _prev: FormState | undefined,
    formData: FormData
) : Promise<FormState> {
    const parsed = vendorRegisterSchema.safeParse({
        storeName: formData.get("storeName"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    })

    if (!parsed.success) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return { fieldErrors: firstErrors(parsed.error.flatten().fieldErrors) }
    }

    const { storeName, name, email, phone, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return { fieldErrors: { email: "An account with this email already exists" }}
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const slug = slugify(storeName)

    try {
        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: { name, email, passwordHash, phone: phone ? phone: null, role: "VENDOR" },
            })
            await tx.vendor.create({
                data: { userId: user.id, storeName, slug, status: "PENDING" }
            })
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return { fieldErrors: { email: "An account with this email already exists" }}
        }
        return { error:  "Something went wrong. Please try again" }
    }

    await signInOrThrow(email, password)
    redirect("/vendor/pending")
}

export async function login(
    _prev: FormState | undefined,
    formData: FormData
) : Promise<FormState> {
    const parsed = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!parsed.success) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return { fieldErrors: firstErrors(parsed.error.flatten().fieldErrors) }
    }

    const { email, password } = parsed.data

    try {
        await signIn("credentials", { email, password, redirect: false })
    } catch (error) {
        if (error instanceof AuthError) {
            return { error:  "Invalid Credentials" }
        }
        throw error
    }

    const user = await prisma.user.findUnique({
        where: { email },
        include: { vendor: true }
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    redirect(homePathForRole(user?.role, user?.vendor?.status))
}

export async function updateProfile(
    _prev: FormState | undefined,
    formData: FormData
) : Promise<FormState> {
    const session = await auth()
    if (!session?.user?.id) return { error: "You must be signed in."}

    const parsed = updateProfileSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        phone: formData.get("phone"),
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
    })

    if (!parsed.success) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return { fieldErrors: firstErrors(parsed.error.flatten().fieldErrors) }
    }

    const { firstName, lastName, phone, newPassword } = parsed.data
    const name = [firstName, lastName].filter(Boolean).join(" ").trim()

    const data: { name: string; phone: string | null; passwordHash?: string } = {
        name, phone: phone ? phone : null,
    }

    if (newPassword) {
        data.passwordHash = await bcrypt.hash(newPassword, 12)
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data
        })
    } catch (error) {
        return { error:  "Could not update profile" }
    }

    revalidatePath("/login")
    return {}
}

async function signInOrThrow(email: string, password: string) {
    try {
        await signIn("credentials", { email, password, redirect: false })
    } catch (error) {
        if (error instanceof AuthError) return
        throw error
    }
}

export async function signOutAction(redirectTo: string = "/login") {
    await signOut({ redirectTo })
}

