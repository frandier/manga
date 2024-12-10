import { Manga } from "@/types/manga";
import Link from "next/link";

export default function Card({ title, score, type, demography, image_url, slug }: Manga) {
    return (
        <Link href={`/manga/${slug}`} className="flex-shrink-0 w-48 bg-gray-900 rounded-lg p-2">
            <div className="relative">
                <img
                    src={image_url}
                    alt={`${title} cover`}
                    className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-0 left-0 bg-emerald-500 text-white px-2 py-1 text-xs rounded-br-lg">
                    {type}
                </div>
                <div
                    className="absolute top-0 right-0 bg-gray-900 bg-opacity-80 text-white px-2 py-1 text-xs rounded-bl-lg flex items-center"
                >
                    <i className="fas fa-star text-yellow-400 mr-1"></i>{score}
                </div>
                <div className="absolute bottom-0 left-0 bg-teal-500 text-white w-full text-center py-1 text-sm rounded-t-lg">
                    Action
                </div>
            </div>
            <h3 className="text-sm font-medium text-gray-100 truncate mt-2" title={title}>
                {title}
            </h3>
        </Link>
    );

}