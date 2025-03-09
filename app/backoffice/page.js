"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BackOfficeHome() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login"); // 🔄 Redirection vers la page de connexion si non authentifié
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-950">Bienvenue dans le BackOffice</h1>
        <p className="mb-6 text-gray-950">Veuillez sélectionner une action :</p>

        <ul className="space-y-4">
          <li><a href="/backoffice/dashboard" className="text-green-500 hover:underline">Tableau de Bord</a></li>
          <li><a href="/backoffice/ListElector" className="text-green-500 hover:underline">Importer Liste Électeurs</a></li>
          <li><a href="/InfCandidat" className="text-green-500 hover:underline">Saisie des Candidats</a></li>
          <li><a href="/backoffice/set-sponsorship-period" className="text-green-500 hover:underline">Ouvrir/Fermer Période de Parrainage</a></li>
          <li><a href="/ListeCandidat" className="text-green-500 hover:underline">Liste Des Electeurs</a></li>
        </ul>
      </div>
    </div>
  );
}
