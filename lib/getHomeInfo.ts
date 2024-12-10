import { Home } from "@/types/home";
import { query } from "./m4ng4";

export default function getHomeInfo(): Promise<Home> {
    return query("latest");
}