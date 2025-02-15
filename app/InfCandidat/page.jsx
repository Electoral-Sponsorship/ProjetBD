"use client";
import { useState } from "react";
import { Mail, Phone, FileImage, RefreshCw } from "lucide-react";
import { Toast, ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/hooks/use-toast";

export default function CandidatForm() {
    const{toast}= useToast();
  const [numeroElecteur, setNumeroElecteur] = useState("");
  const [candidatInfo, setCandidatInfo] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    telephone: "",
    parti: "",
    slogan: "",
    couleurs: "",
    urlInfo: "",
    photo: null,
  });
/* l'api du backend ? j'en ai aucune idee 
const response = await fetch(`https://api.exemple.com/candidats/${numeroElecteur}`); */
  const verifierCandidat = async () => {
    setError(""); 
    setCandidatInfo(null);

    /*  les gars du back c pour vous je pense
     const response = await fetch("https://api.exemple.com/candidats", {
      method: "POST",
      body: form,
    }); */

    const response = await fetch(`http://localhost:5000/candidats?numeroElecteur=${numeroElecteur}`);
    const data = await response.json();

    if (data.length === 0) {
        toast({
            title: "Erreur",
            description: "❌ Le candidat considéré n’est pas présent dans le fichier électoral.",
            action: <ToastAction altText="Try again">"Veuillez Réessayer"</ToastAction>,
          });
          return;
    }

    toast({
        title: "Candidat trouvé",
        description: `✅ ${data[0].nom} ${data[0].prenom} est éligible.`,
        variant: "success",
      });

    setCandidatInfo(data[0]); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCandidat = {
      numeroElecteur,
      ...formData,
      photo: formData.photo ? formData.photo.name : "",
    };

    const response = await fetch("http://localhost:5000/candidats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCandidat),
    });

    if (response.ok) {
      toast({
        title: "Informations enregistrées",
        description: `✅Vos informations ont été enregistrées avec succès`,
        variant: "success",
      });

    } else {
      alert("❌ Erreur lors de l’enregistrement !");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-green-600">Enregistrement des Candidats</h2>

        {/* Saisie du numéro de carte d'électeur */}
        <div className="mt-6">
          <label className="block text-sm font-semibold">Numéro de carte d’électeur :</label>
          <input
            type="text"
            className="w-full px-4 py-3 mt-2 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={numeroElecteur}
            onChange={(e) => setNumeroElecteur(e.target.value)}
          />
          <button 
            className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            onClick={verifierCandidat}
          >
            Vérifier
          </button>
        </div>

        {/* Affichage des erreurs */}
        {error && <p className="text-red-600 text-center font-semibold mt-4">{error}</p>}

        {/* Formulaire seulement si le candidat est trouvé */}
        {candidatInfo && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <p className="text-green-600 font-bold text-lg text-center">
              ✅ {candidatInfo.nom} {candidatInfo.prenom} ({candidatInfo.date_naissance})
            </p>

            <div>
              <label>Email :</label>
              <div className="flex items-center border p-3 rounded-lg">
                <Mail className="mr-2" />
                <input type="email" name="email" placeholder="example@gmail.com" className="w-full focus:outline-none" onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label>Numéro de téléphone :</label>
              <div className="flex items-center border p-3 rounded-lg">
                <Phone className="mr-2" />
                <input type="text" name="telephone" placeholder="Ex:772301578" className="w-full focus:outline-none" onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label>Nom du parti politique :</label>
              <input type="text" name="parti" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" onChange={handleChange} />
            </div>

            <div>
              <label>Slogan :</label>
              <input type="text" name="slogan" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" onChange={handleChange} />
            </div>

            <div>
              <label>Couleurs du parti :</label>
              <input type="text" name="couleurs" placeholder="Ex: Rouge, Vert, Jaune" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" onChange={handleChange} />
            </div>

            <div>
              <label>URL d'information :</label>
              <input type="url" name="urlInfo" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" onChange={handleChange} />
            </div>

            <div>
              <label>Photo du candidat :</label>
              <div className="flex items-center border p-3 rounded-lg">
                <FileImage className="mr-2" />
                <input type="file" name="photo" accept="image/*" onChange={handleFileChange} required />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
              Enregistrer la candidature
            </button>
          </form>
        )}

        
      </div>
    </div>
  );
}
