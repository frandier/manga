import MangaViewer from "@/components/MangaViewer";
import getMangaEpisode from "@/lib/getMangaEpisode";
import { notFound } from "next/navigation";

export default async function MangaPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = ((await params).slug);

  if (slug === "not-found") {
    notFound();
  }

  const episode = await getMangaEpisode(slug);
  return <MangaViewer 
    dir_path={episode.dir_path} 
    images={episode.images} 
    title={episode.title}
    description={episode.description}
    chapter_next={episode.chapter_next}
    chapter_previus={episode.chapter_previus}
  />;
}
