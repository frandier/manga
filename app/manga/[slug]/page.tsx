
import getMangaDetails from "@/lib/getMangaDetails";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Manga({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  if (slug === "not-found") {
    notFound();
  }

  const manga = await getMangaDetails(slug);

  return (
    <div className="bg-[#121212] text-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-[#1E1E1E] rounded-md shadow-md p-4">
          <div className="flex flex-col md:flex-row">
            {/* Imagen del manga */}
            <div className="md:w-1/4 mb-4 md:mb-0">
              <img
                src={manga.thumbnail}
                alt={manga.title}
                className="rounded-md shadow-md w-full object-cover aspect-[3/4]"
              />
            </div>

            {/* Detalles del manga */}
            <div className="md:w-3/4 md:pl-4">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                {manga.title}
              </h1>
              <h2 className="text-sm md:text-md text-gray-400 mb-2 italic">
                {manga.subtitle}
              </h2>
              <p className="mb-4 leading-relaxed text-gray-300 text-justify">
                {manga.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p>
                    <span className="font-semibold text-gray-300">Demografía:</span>{" "}
                    {manga.demography}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Puntuación:</span>{" "}
                    {manga.score}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Estado:</span>{" "}
                    {manga.status}
                  </p>
                </div>

                <div>
                  <p>
                    <span className="font-semibold text-gray-300">Géneros:</span>{" "}
                    {manga.genres.join(", ")}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span className="font-semibold text-gray-300">
                  Títulos alternativos:
                </span>
                <ul className="list-disc pl-5 text-gray-400">
                  {manga.alternative_titles.map((title, index) => (
                    <li key={index} className="leading-relaxed">
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de capítulos */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-white">Capítulos</h3>
          <div className="space-y-4">
            {manga.chapters.map((chapter) => (
              <div
                key={chapter.number}
                className="bg-[#2A2A2A] p-4 rounded-md shadow-md"
              >
                <h4 className="text-md md:text-lg font-bold text-white">
                  Capítulo {chapter.number}: {chapter.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {chapter.options.map((option, index) => (
                    <li
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
                    >
                      <Link href={`/viewer/${option.slug}`}>
                        <div
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline font-medium"
                        >
                          Leer opción {index + 1}
                        </div>
                      </Link>
                      <span className="text-sm text-gray-400 mt-1 sm:mt-0">
                        Subido por {option.author} el{" "}
                        {new Date(option.date).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
