"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SetSponsorshipPeriod() {
  const router = useRouter();
  const { toast } = useToast();
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
   //`${NEXT_PUBLIC_BACKEND_URL}
    try {
      const response = await fetch("https://projetbd-production-8efe.up.railway.app/api/parrainage/set-sponsorship-period", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateDebut,
          dateFin,
          idAdmin: 1, // Remplace par l'ID de l'admin connecté
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Succès",
          description: "✅ La période de parrainage a été définie avec succès.",
          variant: "success",
        });
        router.push("/backoffice/dashboard"); // Redirige vers le tableau de bord
      } else {
        toast({
          title: "Erreur",
          description: `❌ ${data.description}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "❌ Une erreur s'est produite lors de la définition de la période de parrainage.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-950">Définir la période de parrainage</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Date de début :</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Date de fin :</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Chargement...</span> // Affiche un indicateur de chargement
            ) : (
              "Enregistrer"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}