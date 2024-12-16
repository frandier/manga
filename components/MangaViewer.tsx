"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface MangaViewerProps {
    dir_path: string;
    images: string[];
    title: string;
    description: string;
    chapter_previus?: string;
    chapter_next?: string;
}

export default function MangaViewer({
    dir_path,
    images,
    title,
    description,
    chapter_previus,
    chapter_next,
}: MangaViewerProps) {
    const [visibleImages, setVisibleImages] = useState<string[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    const fullImageUrls = useMemo(
        () => images.map((encodedImage) => `${dir_path}${encodedImage}`),
        [dir_path, images]
    );

    const BATCH_SIZE = 5;

    useEffect(() => {
        setVisibleImages([]);
        setLoadedCount(0);
        window.scrollTo({ top: 0, behavior: "smooth" });

        setVisibleImages(fullImageUrls.slice(0, BATCH_SIZE));
        setLoadedCount(BATCH_SIZE);
    }, [fullImageUrls]);

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
            loadedCount < fullImageUrls.length
        ) {
            const newCount = Math.min(loadedCount + BATCH_SIZE, fullImageUrls.length);
            setVisibleImages(fullImageUrls.slice(0, newCount));
            setLoadedCount(newCount);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loadedCount, fullImageUrls]);

    return (
        <div className="bg-[#121212] text-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto py-6 px-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-1">{title}</h1>
                    <p className="text-gray-400 mb-2">{description}</p>
                    <div className="flex justify-between items-center">
                        {chapter_previus ? (
                            <Link href={`/viewer/${chapter_previus}`}>
                                <button className="bg-[#2A2A2A] text-gray-100 px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition">
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Anterior
                                </button>
                            </Link>
                        ) : (
                            <span className="text-gray-500">No hay capítulo anterior</span>
                        )}
                        {chapter_next ? (
                            <Link href={`/viewer/${chapter_next}`}>
                                <button className="bg-[#2A2A2A] text-gray-100 px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition">
                                    Siguiente
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </button>
                            </Link>
                        ) : (
                            <span className="text-gray-500">No hay capítulo siguiente</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    {visibleImages.map((image, index) => (
                        <div key={index} className="mb-4 max-w-full w-full">
                            <LazyLoadImage
                                src={image}
                                alt={`Página ${index + 1}`}
                                className="max-w-full w-full rounded-lg shadow-md"
                                effect="blur"
                                style={{ display: 'block' }}
                            />
                        </div>
                    ))}
                </div>

                {loadedCount < fullImageUrls.length && (
                    <p className="text-center text-gray-400 mt-4">Cargando más páginas...</p>
                )}

                <div className="mt-6 flex justify-between items-center">
                    {chapter_previus ? (
                        <Link href={`/viewer/${chapter_previus}`}>
                            <button className="bg-[#2A2A2A] text-gray-100 px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition">
                                <i className="fas fa-arrow-left mr-2"></i>
                                Anterior
                            </button>
                        </Link>
                    ) : (
                        <span className="text-gray-500">No hay capítulo anterior</span>
                    )}
                    {chapter_next ? (
                        <Link href={`/viewer/${chapter_next}`}>
                            <button className="bg-[#2A2A2A] text-gray-100 px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition">
                                Siguiente
                                <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        </Link>
                    ) : (
                        <span className="text-gray-500">No hay capítulo siguiente</span>
                    )}
                </div>
            </div>
        </div>
    );
}