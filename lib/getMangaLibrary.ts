import { Manga } from "@/types/manga";
import { query } from "./m4ng4";

export default function getMangaLibrary(): Promise<Manga[]> {
    return query("library");
}