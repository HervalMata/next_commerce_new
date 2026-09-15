import {z} from "zod";

export const MAX_IMAGE_BYTES = 2 * 1024 *1024;
export const ACCEPTED_IMAGE_MIME = ["image/jpeg", "image/png", "image/webp"] as const;
export const ACCEPTED_IMAGE_EXT = [".png", ".jpeg", ".jpg", ".webp"] as const;
export const IMAGE_ACCEPT_ATTR = ACCEPTED_IMAGE_MIME.join(", ");

const nameSchema = z
    .string()
    .trim()
    .min(2, "O nome da marca deve ter pelo menos 2 caracteres")
    .max(60, "O nome da marca deve ter pelo menos 60 caracteres ou menos")

const statusSchema = z.enum(["ACTIVE", "INACTIVE"])

const imageFileSchema = z
    .instanceof(File, { message: "Por favor escolha um arquivo de imagem" })
    .refine((f) => f.size <= MAX_IMAGE_BYTES, "A imagem deve ter 2 MB ou menos")
    .refine((f) => (ACCEPTED_IMAGE_MIME as readonly string[])
        .includes(f.type), "Somente JPG, PNG ou WEBP são permitidos")

const emptyFileToUndefined = (v: unknown) => v instanceof File && v.size === 0 ? undefined : v

export const brandCreateSchema = z.object({
    name: nameSchema,
    status: statusSchema,
    image: z.preprocess(emptyFileToUndefined, imageFileSchema),
})

export const brandUpdateSchema = z.object({
    name: nameSchema,
    status: statusSchema,
    image: z.preprocess(emptyFileToUndefined, imageFileSchema.optional()),
})

export type BrandCreateInput = z.infer<typeof brandCreateSchema>;
export type BrandUpdateInput = z.infer<typeof brandUpdateSchema>;
export type BrandStatusValue = z.infer<typeof statusSchema>;
