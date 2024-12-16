import Card from "@/components/ui/Card";
import getSearchManga from "@/lib/getSearchManga";

import { Manga } from "@/types/manga";
import { notFound } from "next/navigation";

export default async function Search({ params }: { params: Promise<{ name: string }> }) {
    const name = (await params).name;
    if (name === "not-found") {
        notFound();
    }
    const result = await getSearchManga(name);

    return (
        <>
            <section className="mb-2 lg:mb-12">
                <h2 className="text-xl sm:text-3xl font-bold mb-2 lg:mb-4 text-gray-100">
                    RESULTADOS PARA <span className="text-emerald-400">{decodeURIComponent(name)}</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {result.map((manga: Manga) => (
                        <Card key={manga.title} {...manga} />
                    ))}
                </div>

            </section>
        </>
    );
}