"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Eye, RefreshCw, CircleUserRound} from "lucide-react";

export default function ListeCandidats() {
  const { toast } = useToast();
  const [candidats, setCandidats] = useState([]);
  const [selectedCandidat, setSelectedCandidat] = useState(null);

  // Charger la liste des candidats depuis le backend ou json-server
  useEffect(() => {
    fetch("http://localhost:8000/api/candidats") // 🔹 À modifier selon l'API backend
      .then((res) => res.json())
      .then((data) => setCandidats(data))
      .catch(() => toast({ title: "Erreur", description: "Impossible de charger les candidats", variant: "destructive" }));
  }, []);

  // Afficher les détails d'un candidat
  const voirDetails = (candidat) => {
    setSelectedCandidat(candidat);
  };

  const genererCode = async () => {
    if (!selectedCandidat) {
      toast({ title: "Erreur", description: "Aucun candidat sélectionné", variant: "destructive" });
      return;
    }
  
    // Envoi de la requête POST à Laravel
    const response = await fetch(`http://localhost:8000/api/resendCode/${selectedCandidat.numElecteur}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
  
    if (response.ok) {
      toast({
        title: "Succès",
        description:`✅ ${data.message} a l'\adresse ${selectedCandidat.email}`, 
      });
    } else {
      toast({
        title: "Erreur",
        description:`❌${data.message}`,
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-green-600">Liste des Candidats</h2>

        {/* Affichage de la liste des candidats */}
        <div className="mt-6">
          {candidats.length > 0 ? (
            <ul className="space-y-4">
              {candidats.map((candidat) => (
                <li key={candidat.idCandidat} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                 <CircleUserRound /> <span>{candidat.nom} {candidat.prenom}</span>
                  <button onClick={() => voirDetails(candidat)} className="text-blue-600 hover:text-blue-800 flex items-center">
                    <Eye className="mr-2" /> Voir Détails
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">Aucun candidat enregistré.</p>
          )}
        </div>

        {/* Affichage des détails du candidat sélectionné */}
        {selectedCandidat && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-bold text-green-600">Détails du Candidat</h3>
            <p><strong>Nom :</strong> {selectedCandidat.nom} {selectedCandidat.prenom}</p>
            <p><strong>Email :</strong> {selectedCandidat.email}</p>
            <p><strong>Téléphone :</strong> {selectedCandidat.telephone}</p>
            <p><strong>Parti Politique :</strong> {selectedCandidat.parti}</p>
            <p><strong>Slogan :</strong> {selectedCandidat.slogan}</p>
            <p><strong>Couleurs :</strong> {selectedCandidat.couleurs}</p>

            {/* Bouton pour générer un nouveau code */}
            <button 
              onClick={genererCode} 
              className="mt-4 w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center justify-center">
              <RefreshCw className="mr-2" />
              Générer un nouveau code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
