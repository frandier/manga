import { MangaDetail } from "@/types/manga";
import { query } from "./m4ng4";

export default function getMangaDetails(slug: string): Promise<MangaDetail> {
    return query(`details?slug=${slug}`);
}