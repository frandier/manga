"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

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

    // Memorizar las URLs decodificadas
    const fullImageUrls = useMemo(
        () => images.map((encodedImage) => `${dir_path}${encodedImage}`),
        [dir_path, images]
    );

    const BATCH_SIZE = 5;

    useEffect(() => {
        // Resetear imágenes visibles y scroll al inicio al cambiar las imágenes
        setVisibleImages([]);
        setLoadedCount(0);
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Cargar el primer lote
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
        <div className="bg-[#121212] text-gray-100 min-h-screen py-6 px-4">
            <div className="max-w-3xl mx-auto bg-[#1E1E1E] rounded-lg shadow-lg p-4">
                {/* Información del capítulo */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">{title}</h1>
                    <p className="text-gray-400 mb-4">{description}</p>
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

                {/* Visor del manga */}
                {visibleImages.map((image, index) => (
                    <div key={index} className="mb-6">
                        <img
                            src={image}
                            alt={`Página ${index + 1}`}
                            className="w-full h-auto rounded-lg shadow-md"
                            loading="lazy"
                        />
                    </div>
                ))}
                {loadedCount < fullImageUrls.length && (
                    <p className="text-center text-gray-400 mt-6">Cargando más páginas...</p>
                )}
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
        </div>
    );
}
