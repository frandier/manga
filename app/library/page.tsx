import Card from "@/components/ui/Card";
import getMangaLibrary from "@/lib/getMangaLibrary";
import { Manga } from "@/types/manga";

export default async function Library() {
  const libray = await getMangaLibrary()

  return (
    <>
      <section className="mb-2 lg:mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {libray.map((manga: Manga) => (
            <Card key={manga.title} {...manga} />
          ))}
        </div>
      </section>
    </>
  );
}
