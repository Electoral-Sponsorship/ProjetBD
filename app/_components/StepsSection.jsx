"use client";
import { useState } from "react";
import { FaUserPlus, FaHandPointer, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

function StepsSection() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Créer un compte électeur",
      icon: <FaUserPlus className="text-4xl text-green-600" />,
      description:
        "Les électeurs doivent créer un profil en ligne en saisissant leurs informations personnelles (numéro de carte d'électeur, numéro de CIN, bureau de vote, etc.). Un code d'authentification unique est envoyé par SMS et email pour valider leur inscription.",
    },
    {
      id: 2,
      title: "Période de parrainage",
      icon: <FaCalendarAlt className="text-4xl text-orange-600" />,
      description:
        "La période de parrainage est définie par des dates officielles. Les électeurs ne peuvent soumettre leur parrainage qu'entre ces dates. Une fois la période terminée, toutes les actions de parrainage sont automatiquement bloquées.",
    },
    {
      id: 3,
      title: "Choisir un candidat",
      icon: <FaHandPointer className="text-4xl text-blue-600" />,
      description:
        "Après validation de leur profil, les électeurs peuvent consulter la liste des candidats disponibles (avec photo, slogan, couleurs, etc.) et choisir celui qu'ils souhaitent parrainer. Un code unique est généré pour confirmer leur choix.",
    },
    {
      id: 4,
      title: "Valider le parrainage",
      icon: <FaCheckCircle className="text-4xl text-purple-600" />,
      description:
        "Pour finaliser leur parrainage, les électeurs doivent saisir un code à usage unique reçu par SMS et email. Une fois validé, leur soutien est enregistré de manière sécurisée et ils reçoivent une confirmation par email/SMS.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-up">
          Comment ça marche ?
        </h2>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="border border-gray-200 rounded-lg shadow-md bg-white">
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition duration-300"
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-md">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
                    activeStep === step.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`p-6 text-gray-600 transition-all duration-300 overflow-hidden ${
                  activeStep === step.id
                    ? "max-h-[20rem] md:max-h-60 lg:max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex items-center space-x-4">
                  {step.icon}
                  <p>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StepsSection;