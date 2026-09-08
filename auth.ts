import NextAuth from "next-auth";
import {z} from "zod";
import {PrismaAdapter} from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import {authConfig} from "@/auth.config";

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
})

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(rawCredentials){
                const parsed = credentialsSchema.safeParse(rawCredentials)
                if (!parsed.success) return null

                const email = parsed.data.email.toLowerCase()
                const user = await prisma.user.findUnique({
                    where: { email },
                    include: { vendor: true }
                })
                if (!user) return null
                const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
                if (!valid) return null
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    vendorId: user.vendor?.id ?? null,
                    vendorStatus: user.vendor?.status ?? null,
                }
            }
        })
    ]
});
