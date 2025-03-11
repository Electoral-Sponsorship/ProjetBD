"use client";

import { useState } from "react";

const ParrainProfile = () => {
  const [electorNumber, setElectorNumber] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [votingOffice, setVotingOffice] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [authCodeSent, setAuthCodeSent] = useState(false);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); // Effacer l'erreur lorsque l'utilisateur modifie un champ
  };

  const validateAuthenticationInfo = async () => {
    if (!electorNumber || !identityNumber || !lastName || !votingOffice) {
      setError("Tous les champs d'authentification sont obligatoires.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/parrains/validate-electeur", {
        method: "POST",
        body: JSON.stringify({ electorNumber, identityNumber, lastName, votingOffice }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        setStep(2);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.");
    }
  };

  const handleSubmitContactInfo = async (e) => {
    e.preventDefault();
    if (!phone && !email) {
      setError("Veuillez entrer un numéro de téléphone ou un email.");
      return;
    }
    console.log("Elector Number utilisé pour l'enregistrement:", electorNumber); 
    try {
      const response = await fetch("http://localhost:8000/api/parrains/register", {
        method: "POST",
        body: JSON.stringify({ electorNumber, phone, email}),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setError(data.message);
      } else {
        setError(data.error)
      }
      return;
      

      // const registrationResponse = await fetch("http://localhost:8000/api/parrains/register", {
      //   method: "POST",
      //   body: JSON.stringify({ electorNumber, identityNumber, lastName, firstName, votingOffice, phone, email }),
      //   headers: { "Content-Type": "application/json" },
      // });

      // if (registrationResponse.ok) {
      //   await sendAuthCode(phone, email);
      //   setAuthCodeSent(true);
      //   alert("Profil enregistré. Un code de vérification a été envoyé par email.");
      // } else {
      //   setError("Erreur lors de l'enregistrement du profil.");
      // }
    } catch (error) {
      setError("Erreur réseau. Veuillez réessayer.");
    }
  };

  // const sendAuthCode = async (phone, email) => {
  //   try {
  //     await fetch("/api/sendAuthCode", {
  //       method: "POST",
  //       body: JSON.stringify({ phone, email }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   } catch (error) {
  //     setError("Erreur lors de l'envoi du code de vérification.");
  //   }
  // };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-950">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Enregistrer votre profil parrain</h1>
        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); validateAuthenticationInfo(); }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Numéro de Carte d'Électeur :</label>
              <input
                type="text"
                value={electorNumber}
                onChange={handleChange(setElectorNumber)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Numéro de CIN :</label>
              <input
                type="text"
                value={identityNumber}
                onChange={handleChange(setIdentityNumber)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nom :</label>
              <input
                type="text"
                value={lastName}
                onChange={handleChange(setLastName)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Bureau de Vote :</label>
              <input
                type="text"
                value={votingOffice}
                onChange={handleChange(setVotingOffice)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded mt-4">Valider</button>
          </form>
        ) : (
          <form onSubmit={handleSubmitContactInfo}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Adresse Email :</label>
              <input
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Numéro de Téléphone :</label>
              <input
                type="tel"
                value={phone}
                onChange={handleChange(setPhone)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded mt-4">Enregistrer</button>
          </form>
        )}

        {authCodeSent && <p className="mt-4 text-green-500 text-center">Un code de vérification a été envoyé par SMS et email.</p>}
      </div>
    </div>
  );
};

export default ParrainProfile;

