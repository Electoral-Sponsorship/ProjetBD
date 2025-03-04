"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Calendar, Users } from "lucide-react";

export default function SuiviParrainages() {
  const router = useRouter();
  const [parrainages, setParrainages] = useState([]);
  const [candidat, setCandidat] = useState(null);

  useEffect(() => {
    const storedCandidat = localStorage.getItem("candidat");
    if (!storedCandidat) {
      router.push("/candidat/login");
      return;
    }

    const candidatData = JSON.parse(storedCandidat);
    setCandidat(candidatData);

    // Charger les parrainages depuis json-server
    fetch(`http://localhost:5000/parrainages?candidat_id=${candidatData.id}`)
      .then((res) => res.json())
      .then((data) => setParrainages(data))
      .catch(() => toast({ title: "Erreur", description: "Impossible de charger les parrainages.", variant: "destructive" }));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-green-600">📊 Suivi des Parrainages</h2>
        {candidat && (
          <p className="text-center text-gray-700 flex items-center justify-center gap-2">
            <Users className="text-green-600" />
            Candidat : {candidat.email}
          </p>
        )}

        <div className="mt-6">
          {parrainages.length > 0 ? (
            <ul className="space-y-4">
              {parrainages.map((p) => (
                <li key={p.date} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-blue-600" />
                    <span>{p.date}</span>
                  </div>
                  <span className="font-bold flex items-center gap-2">
                    <Users className="text-green-600" />
                    {p.total} parrains
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">Aucun parrainage enregistré.</p>
          )}
        </div>
      </div>
    </div>
  );
}
