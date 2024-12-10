"use client"; 
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const getSearchManga = (name: string) => {
    if (!name) {
      alert("Por favor, ingrese un término de búsqueda.");
      return;
    }
    setSearchInput("");
    router.push(`/search/${name}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getSearchManga(searchInput);
  };

  return (
    <header className="bg-gray-900 py-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <Link href="/" className="text-emerald-400 text-2xl font-bold">
          M4NG4
        </Link>

        {/* Search input for large screens */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-4 flex-1 md:flex-none md:justify-end">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 focus:ring-emerald-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>

        <nav className="flex items-center space-x-4 md:mt-0">
          <Link href="/library" className="text-gray-300 hover:text-emerald-400">
            Libreria
          </Link>
        </nav>
      </div>

      {/* Search input for small screens */}
      <div className="block md:hidden mt-4 px-4">
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="flex-grow px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 focus:ring-emerald-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </header>
  );
}
