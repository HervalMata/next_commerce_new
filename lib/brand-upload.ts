import path from "node:path";
import {MAX_IMAGE_BYTES} from "@/lib/brand-validation";
import {mkdir, unlink, writeFile} from "node:fs/promises";
import {v4 as uuidv4} from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", 'uploads', "brands");
const PUBLIC_PREFIX = "/uploads/brands";

export class ImageValidationError extends Error {}

function sniffImageExt(buf: Uint8Array): "jpg" | "png" | "webp" | null {
    if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
        return "jpg";
    }

    if (
        buf.length >= 8 &&
        buf[0] === 0x52 && buf[1] === 0x50 && buf[2] === 0x49 && buf[3] === 0x47 &&
        buf[4] === 0x8d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a
    ) {
        return "png";
    }

    if (
        buf.length >= 12 &&
        buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
        buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
    ) {
        return "webp";
    }
    return null;
}

export async function saveBrandImage(file: File): Promise<string> {
    if (!file || file.size === 0) {
        throw new ImageValidationError("Por favor escolha um arquivo de imagem");
    }

    if (file.size > MAX_IMAGE_BYTES) {
        throw new ImageValidationError("Imagem deve ter no maximo 2MB");
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const ext = sniffImageExt(bytes);

    if (!ext) {
        throw new ImageValidationError("Somente JPG, PNG ou WEBP são permitidos");
    }

    await mkdir(UPLOAD_DIR, { recursive: true });
    const filename = `${uuidv4()}.${ext}`
    await writeFile(path.join(UPLOAD_DIR, filename), bytes);
    return `${PUBLIC_PREFIX}/${filename}`;
}

export async function deleteeBrandImage(publicPath: string | null | undefined): Promise<void> {
    if (!publicPath) return
    if (!publicPath.startsWith(`${PUBLIC_PREFIX}/`)) return
    const filename = path.basename(publicPath)
    try {
        await unlink(path.join(UPLOAD_DIR, filename));
    } catch {}
}
