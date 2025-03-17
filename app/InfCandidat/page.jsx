"use client";
import { useState } from "react";
import { Mail, Phone, FileImage, RefreshCw } from "lucide-react";
import { Toast, ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/hooks/use-toast";

export default function CandidatForm() {
  const { toast } = useToast();
  const [numeroElecteur, setNumeroElecteur] = useState("");
  const [candidatInfo, setCandidatInfo] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement
  const [isVerifying, setIsVerifying] = useState(false); // État spécifique pour la vérification
  const [formData, setFormData] = useState({
    email: "",
    telephone: "",
    parti: "",
    slogan: "",
    couleurs: "",
    urlInfo: "",
    numeroElecteur: "",
    photo: null,
  });

  const verifierCandidat = async () => {
    setError("");
    setCandidatInfo(null);
    setIsVerifying(true); // Activer le chargement spécifique à la vérification

    try {
      const response = await fetch(`https://projetbd-production-8efe.up.railway.app/api/verify/${numeroElecteur}`);
      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Erreur",
          description: `❌ ${data.message}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Candidat trouvé",
        description: `✅ ${data.candidat.nom} ${data.candidat.prenom} est éligible.`,
        variant: "success",
      });

      setCandidatInfo(data.candidat);
      setFormData((prev) => ({
        ...prev,
        numeroElecteur: numeroElecteur || null,
      }));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "❌ Une erreur s'est produite lors de la vérification.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false); // Désactiver le chargement spécifique à la vérification
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activer le chargement pour l'enregistrement

    const formDataToSend = new FormData();
    formDataToSend.append("numeroElecteur", formData.numeroElecteur);
    formDataToSend.append("telephone", formData.telephone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("parti", formData.parti);
    formDataToSend.append("slogan", formData.slogan);
    formDataToSend.append("couleurs", formData.couleurs);
    formDataToSend.append("urlInfo", formData.urlInfo);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const response = await fetch("https://projetbd-production-8efe.up.railway.app/api/register", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Informations enregistrées",
          description: `✅ ${data.message}`,
          variant: "success",
        });

        // Réinitialiser le formulaire après succès
        setFormData({
          email: "",
          telephone: "",
          parti: "",
          slogan: "",
          couleurs: "",
          urlInfo: "",
          numeroElecteur: "",
          photo: null,
        });
        setNumeroElecteur("");
        setCandidatInfo(null);
      } else {
        toast({
          title: "Erreur",
          description: `❌ ${data.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "❌ Une erreur s'est produite lors de l'envoi des données.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Désactiver le chargement
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
            className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition flex items-center justify-center"
            onClick={verifierCandidat}
            disabled={isVerifying} // Désactiver le bouton pendant la vérification
          >
            {isVerifying ? ( // Afficher l'animation de chargement si isVerifying est true
              <>
                <RefreshCw className="animate-spin mr-2" /> {/* Icône de chargement */}
                Vérification en cours...
              </>
            ) : (
              "Vérifier" // Texte normal du bouton
            )}
          </button>
        </div>

        {/* Affichage des erreurs */}
        {error && <p className="text-red-600 text-center font-semibold mt-4">{error}</p>}

        {/* Formulaire seulement si le candidat est trouvé */}
        {candidatInfo && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <p className="text-green-600 font-bold text-lg text-center">
              ✅ {candidatInfo.nom} {candidatInfo.prenom} ({candidatInfo.ddn})
            </p>

            <div>
              <label>Email :</label>
              <div className="flex items-center border p-3 rounded-lg">
                <Mail className="mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="w-full focus:outline-none"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
            </div>

            <div>
              <label>Numéro de téléphone :</label>
              <div className="flex items-center border p-3 rounded-lg">
                <Phone className="mr-2" />
                <input
                  type="text"
                  name="telephone"
                  placeholder="Ex:772301578"
                  className="w-full focus:outline-none"
                  onChange={handleChange}
                  value={formData.telephone}
                  required
                />
              </div>
            </div>

            <div>
              <label>Nom du parti politique :</label>
              <input
                type="text"
                name="parti"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                onChange={handleChange}
                value={formData.parti}
              />
            </div>

            <div>
              <label>Slogan :</label>
              <input
                type="text"
                name="slogan"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                onChange={handleChange}
                value={formData.slogan}
              />
            </div>

            <div>
              <label>Couleurs du parti :</label>
              <input
                type="text"
                name="couleurs"
                placeholder="Ex: Rouge, Vert, Jaune"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                onChange={handleChange}
                value={formData.couleurs}
              />
            </div>

            <div>
              <label>URL d'information :</label>
              <input
                type="url"
                name="urlInfo"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                onChange={handleChange}
                value={formData.urlInfo}
              />
            </div>

            <div>
              <label>Photo du candidat :</label>
              <div className="flex items-center border p-3 rounded-lg">
                <FileImage className="mr-2" />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center"
              disabled={isLoading} // Désactiver le bouton pendant le chargement
            >
              {isLoading ? (
                <RefreshCw className="animate-spin mr-2" /> // Animation de chargement
              ) : null}
              {isLoading ? "Enregistrement en cours..." : "Enregistrer la candidature"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}