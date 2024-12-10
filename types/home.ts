import { Manga } from "./manga";

export interface Home {
    trending: Manga[];
    populars: Manga[];
}