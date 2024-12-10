import { MangaEpisode } from "@/types/manga";
import { query } from "./m4ng4";

export default function getMangaEpisode(slug: string): Promise<MangaEpisode> {
    return query(`episode?slug=${slug}`);
}