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

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-green-600">Enregistrer votre parrainage</h1>

        
        {step === 1 && (
          <div className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Numéro de carte d'électeur"
              value={electorNumber}
              onChange={(e) => setElectorNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Numéro de carte d'identité"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
              Valider mes informations
            </button>
          </div>
        )}

        
        {step === 2 && (
          <div className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Code d'authentification"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
              Valider le code
            </button>
          </div>
        )}

      
        {step === 3 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-center">Choisissez un candidat à parrainer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`border p-4 rounded-lg shadow-lg cursor-pointer ${
                    selectedCandidate?.id === candidate.id ? 'border-green-500' : ''
                  }`}
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <img src={candidate.photo} alt={candidate.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                  <h3 className="font-semibold text-center">{candidate.name}</h3>
                  <p className="text-sm text-gray-500 text-center">{candidate.slogan}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
              Envoyer le code de validation
            </button>
          </div>
        )}

        
        {validationCodeSent && (
          <div className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Entrez le code de validation"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
              Valider le parrainage
            </button>
          </div>
        )}

        
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Parrainage;
