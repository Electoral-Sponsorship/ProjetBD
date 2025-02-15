"use client";

import { useState } from 'react';

const Parrainage = () => {
  const [electorNumber, setElectorNumber] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); 
  const [citizenInfo, setCitizenInfo] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [validationCodeSent, setValidationCodeSent] = useState(false);

  const candidates = [
    { id: 1, name: 'Candidat 1', slogan: 'Slogan 1', color: '#FF5733', photo: '/images/candidate1.jpg' },
    { id: 2, name: 'Candidat 2', slogan: 'Slogan 2', color: '#33FF57', photo: '/images/candidate2.jpg' },
    { id: 3, name: 'Candidat 3', slogan: 'Slogan 3', color: '#3357FF', photo: '/images/candidate3.jpg' },
  ];


  const validateCitizenInfo = async () => {
    if (!electorNumber || !identityNumber) {
      setError('Veuillez saisir votre numéro de carte d\'électeur et de carte d\'identité.');
      return;
    }


    const response = await fetch('/api/verifyCitizenInfo', {
      method: 'POST',
      body: JSON.stringify({ electorNumber, identityNumber }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (data.isValid) {
      setCitizenInfo(data.citizen);
      setStep(2); 
    } else {
      setError('Les informations sont incorrectes.');
    }
  };


  const validateAuthCode = async () => {
    const response = await fetch('/api/verifyAuthCode', {
      method: 'POST',
      body: JSON.stringify({ authCode }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (data.isValid) {
      setStep(3); 
    } else {
      setError('Le code d\'authentification est incorrect.');
    }
  };


  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };


  const handleSendValidationCode = async () => {
    if (!selectedCandidate) {
      setError('Veuillez choisir un candidat à parrainer.');
      return;
    }

    const response = await fetch('/api/sendValidationCode', {
      method: 'POST',
      body: JSON.stringify({ selectedCandidateId: selectedCandidate.id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setValidationCodeSent(true);
      alert('Un code de validation vous a été envoyé.');
    }
  };


  const handleValidateParrainage = async () => {
    const response = await fetch('/api/validateParrainage', {
      method: 'POST',
      body: JSON.stringify({ confirmationCode }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (data.success) {
      alert('Parrainage enregistré avec succès.');
    } else {
      setError('Le code de validation est incorrect.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Enregistrer votre parrainage</h1>

      {step === 1 && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Numéro de carte d'électeur"
            value={electorNumber}
            onChange={(e) => setElectorNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Numéro de carte d'identité"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={validateCitizenInfo}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Valider mes informations
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Code d'authentification"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={validateAuthCode}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Valider le code d'authentification
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Choisissez un candidat à parrainer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="border p-4 rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleSelectCandidate(candidate)}
              >
                <img src={candidate.photo} alt={candidate.name} className="w-full h-32 object-cover mb-4 rounded-lg" />
                <h3 className="font-semibold">{candidate.name}</h3>
                <p>{candidate.slogan}</p>
                <p className="text-sm text-gray-500">Couleur: {candidate.color}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleSendValidationCode}
            className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Envoyer le code de validation
          </button>
        </div>
      )}

      {validationCodeSent && (
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Entrez le code de validation"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleValidateParrainage}
            className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Valider le parrainage
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Parrainage;
