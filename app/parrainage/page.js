"use client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Parrainage = () => {
  const [numElecteur, setNumElecteur] = useState("");
  const [numCIN, setNumCIN] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [step, setStep] = useState(1);
  const [citizenInfo, setCitizenInfo] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [validationCodeSent, setValidationCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour valider les informations de l'électeur
  const validateElectorInfo = async () => {
    if (!numElecteur || !numCIN) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://projetbd-production-8efe.up.railway.app/api/parrainage/verify-identifiers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numElecteur, numCIN }),
      });

      const data = await response.json();
      console.log("Réponse de l'API :", data);

      if (response.ok) {
        setCitizenInfo(data);
        setStep(2);
      } else {
        toast({
          title: "Erreur",
          description: data.description || "Les informations fournies sont incorrectes.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur de connexion. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour valider le code d'authentification
  const validateAuthCode = async () => {
    if (!authCode) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer le code d'authentification.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://projetbd-production-8efe.up.railway.app/api/parrainage/verify-auth-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numElecteur, codeAuth: authCode }),
      });

      const data = await response.json();
      console.log("Réponse de l'API :", data);

      if (response.ok) {
        setCitizenInfo(data);
        setStep(3);
      } else {
        toast({
          title: "Erreur",
          description: data.description || "Le code d'authentification est invalide.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur de connexion. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour envoyer le code de validation
  const sendValidationCode = async () => {
    if (!selectedCandidate) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un candidat.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://projetbd-production-8efe.up.railway.app/api/parrainage/send-validation-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numElecteur }),
      });

      const data = await response.json();

      if (response.ok) {
        setValidationCodeSent(true);
        toast({
          title: "Succès",
          description: "Code de validation envoyé avec succès.",
          variant: "success",
        });
      } else {
        toast({
          title: "Erreur",
          description: data.description || "Erreur lors de l'envoi du code de validation.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur de connexion. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour valider le parrainage
  const validateParrainage = async () => {
    if (!confirmationCode) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer le code de validation.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCandidate) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un candidat.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://projetbd-production-8efe.up.railway.app/api/parrainage/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCandidat: selectedCandidate.idCandidat,
          numElecteur: numElecteur,
          codeValidation: confirmationCode,
        }),
      });
      console.log("show response", response);
      const data = await response.json();
      console.log("Réponse du backend :", data);

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Parrainage effectué avec succès !",
          variant: "success",
        });
        // Réinitialiser le formulaire
        setNumElecteur("");
        setNumCIN("");
        setAuthCode("");
        setStep(1);
        setCitizenInfo(null);
        setSelectedCandidate(null);
        setConfirmationCode("");
        setValidationCodeSent(false);
      } else {
        toast({
          title: "Erreur",
          description: data.description || "Erreur lors de la validation du parrainage.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur de connexion. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-green-600">Enregistrer votre parrainage</h1>

        {/* Étape 1 : Saisie des informations de l'électeur */}
        {step === 1 && (
          <div className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Numéro de carte d'électeur"
              value={numElecteur}
              onChange={(e) => setNumElecteur(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Numéro de carte d'identité"
              value={numCIN}
              onChange={(e) => setNumCIN(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              onClick={validateElectorInfo}
              className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Valider mes informations"}
            </button>
          </div>
        )}

        {/* Étape 2 : Saisie du code d'authentification */}
        {step === 2 && (
          <div className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Code d'authentification"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              onClick={validateAuthCode}
              className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Valider le code"}
            </button>
          </div>
        )}

        {/* Étape 3 : Choix du candidat */}
        {step === 3 && citizenInfo && citizenInfo.candidats && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-center">Choisissez un candidat à parrainer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {citizenInfo.candidats.map((candidate) => (
                <div
                  key={candidate.idCandidat}
                  className={`border p-4 rounded-lg shadow-lg cursor-pointer ${
                    selectedCandidate?.idCandidat === candidate.idCandidat ? "border-green-500" : ""
                  }`}
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <img src={candidate.photo} alt={candidate.nom} className="w-full h-32 object-cover rounded-lg mb-2" />
                  <h3 className="font-semibold text-center">{candidate.nom}</h3>
                  <p className="text-sm text-gray-500 text-center">{candidate.slogan}</p>
                </div>
              ))}
            </div>
            <button
              onClick={sendValidationCode}
              className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Envoyer le code de validation"}
            </button>
          </div>
        )}

        {/* Étape 4 : Saisie du code de validation */}
        {validationCodeSent && (
          <div className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Entrez le code de validation"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              onClick={validateParrainage}
              className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Valider le parrainage"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Parrainage;