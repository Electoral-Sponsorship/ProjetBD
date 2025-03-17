"use client";

import { useState } from "react";
import { ClipboardList, UserCheck, Mail, Key, AlertCircle, Calendar } from "lucide-react";

const SuiviParrainage = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [parrainages, setParrainages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://projetbd-production-8efe.up.railway.app/api/verifyCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });
 
      const data = await response.json();
      if (response.ok) {
        fetchParrainages();
        setIsVerified(true);
      } else {
        setError(data.message || "Code d'authentification invalide.");
        setEmail("");
        setVerificationCode("");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la vérification du code.");
      setEmail("");
      setVerificationCode("");
    } finally {
      setLoading(false);
    }
  };

  const fetchParrainages = async () => {
    try {
      const response = await fetch("https://projetbd-production-8efe.up.railway.app/api/parrainage/track-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adresseMail: email, codeAuth: verificationCode }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setParrainages(data);
      } else {
        setError(data.description || "Erreur lors de la récupération des parrainages.");
        setEmail("");
        setVerificationCode("");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la récupération des parrainages.");
      setEmail("");
      setVerificationCode("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-950">
      {!isVerified ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Suivi des Parrainages</h1>
          <form onSubmit={handleVerifyCode}>
            <div className="mb-4 flex items-center gap-2">
              <Mail className="text-gray-600" />
              <input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4 flex items-center gap-2">
              <Key className="text-gray-600" />
              <input
                type="text"
                placeholder="Code de vérification"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-center flex items-center gap-2">
                <AlertCircle /> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? "Vérification en cours..." : "Vérifier le code"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-bold text-center text-green-600 mb-4">Liste des Parrainages</h2>
          {parrainages.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {parrainages.map((parrainage, index) => (
                <li key={index} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <UserCheck className="text-green-500" />
                    <div>
                      <p className="font-semibold">{parrainage.nom} {parrainage.prenoms}</p>
                      <p className="text-sm text-gray-600">Numéro d'électeur: {parrainage.numElecteur}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-2"><Calendar className="text-gray-500" /> Date du parrainage: {parrainage.dateParrainage}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Sexe: {parrainage.sexe}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500">
              <AlertCircle className="mx-auto text-red-500 mb-2" />
              Aucun parrainage disponible.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuiviParrainage;
