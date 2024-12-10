import { Manga } from "@/types/manga";
import { query } from "./m4ng4";

export default function getSearchManga(name: string): Promise<Manga[]> {
    return query(`search?query=${name}`);
}