"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };


  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-green-900 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo et Titre */}
        <div className="flex items-center space-x-4">
          <img
            src="https://th.bing.com/th/id/OIP.fyFuEMr9oQl5ADIsv5WPyQHaJY?rs=1&pid=ImgDetMain"
            alt="Logo"
            className="h-12 rounded-full"
          />
          <h1 className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-300 cursor-pointer">
            Senegal Electoral Sponsorship
          </h1>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-yellow-300 transition duration-300">
            Accueil
          </Link>
          <Link href="/InfCandidat" className="text-white hover:text-yellow-300 transition duration-300">
            Informations Candidat
          </Link>
          <Link href="/parrainage" className="text-white hover:text-yellow-300 transition duration-300">
            Parrainage
          </Link>
          <Link href="/parrain" className="text-white hover:text-yellow-300 transition duration-300">
            Enregistrer Parrain
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
            >
              Déconnexion
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-white hover:bg-green-200 text-green-600 font-semibold py-2 px-4 rounded shadow-md transition duration-300">
                Connexion
              </button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            className="text-white hover:text-yellow-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)} 
        ></div>
      )}

      <div
        className={`md:hidden bg-green-800 shadow-lg fixed top-0 right-0 h-screen w-64 z-20 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-yellow-300 focus:outline-none"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ul className="py-4 text-white mt-16">
          <li className="px-4 py-3 border-b border-green-700 hover:bg-green-700 transition duration-300">
            <Link href="/">Accueil</Link>
          </li>
          <li className="px-4 py-3 border-b border-green-700 hover:bg-green-700 transition duration-300">
            <Link href="/InfCandidat">Informations Candidat</Link>
          </li>
          <li className="px-4 py-3 border-b border-green-700 hover:bg-green-700 transition duration-300">
            <Link href="/parrainage">Parrainage</Link>
          </li>
          <li className="px-4 py-3 border-b border-green-700 hover:bg-green-700 transition duration-300">
            <Link href="/parrain">Enregistrer Parrain</Link>
          </li>
          {user ? (
            <li className="px-4 py-3 hover:bg-red-600 transition duration-300">
              <button onClick={handleLogout}>Déconnexion</button>
            </li>
          ) : (
            <li className="px-4 py-3 hover:bg-green-700 transition duration-300">
              <Link href="/login">Connexion</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}