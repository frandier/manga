import Card from "@/components/ui/Card";
import getHomeInfo from "@/lib/getHomeInfo";
import { Manga } from "@/types/manga";

export default async function Home() {
  const latestInfo = await getHomeInfo();

  return (
    <>
      <section className="mb-2 lg:mb-12">
        <h2 className="text-xl sm:text-3xl font-bold mb-2 lg:mb-4 text-gray-100">
          TENDENCIAS EN <span className="text-emerald-400">MA4NG4</span>
        </h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-800">
          {latestInfo.trending.map((manga: Manga) => (
            <Card key={manga.title} {...manga} />
          ))}
        </div>
      </section>
      <section className="mb-2 lg:mb-12">
        <h2 className="text-xl sm:text-3xl font-bold mb-2 lg:mb-4 text-gray-100">
          MANGAS POPULARES EN <span className="text-emerald-400">MA4NG4</span>
        </h2>
        <div className="hidden lg:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {latestInfo.populars.map((manga: Manga) => (
            <Card key={manga.title} {...manga} />
          ))}
        </div>
        <div className="flex lg:hidden space-x-4 overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-800">
          {latestInfo.populars.map((manga: Manga) => (
            <Card key={manga.title} {...manga} />
          ))}
        </div>

      </section>
    </>
  );
}
