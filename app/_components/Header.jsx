"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
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

  return (
    <header className="bg-green-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="https://th.bing.com/th/id/OIP.fyFuEMr9oQl5ADIsv5WPyQHaJY?rs=1&pid=ImgDetMain" alt="Logo" className="h-10 mr-4" />
          <h1 className="text-2xl font-bold text-white hover:text-yellow-300">Electoral Sponsor Pro</h1>
        </div>

        <nav className="flex space-x-6">
          <Link href="/" className="text-white hover:text-yellow-300">Accueil</Link>
          <Link href="/InfCandidat" className="text-white hover:text-yellow-300">Informations Candidat</Link>
          <Link href="/parrainage" className="text-white hover:text-yellow-300">Parrainage</Link>
          {user ? (
            <Link href="/backoffice" className="text-white hover:text-yellow-300">BackOffice</Link>
          ) : (
            <a onClick={() => router.push("/login")} className="text-white hover:text-yellow-300 cursor-pointer">BackOffice</a>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
              Déconnexion
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-white hover:bg-green-200 text-green-600 font-semibold py-2 px-4 rounded">
                Connexion
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
