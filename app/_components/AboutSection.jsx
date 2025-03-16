import { FaUsers, FaLock, FaChartBar } from "react-icons/fa"; 

function AboutSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-up">
          À propos de ce projet
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-16 text-center animate-fade-in-up">
          Ce projet vise à numériser le processus de gestion des parrainages pour les élections présidentielles au Sénégal. Il permet aux électeurs de soutenir leurs candidats préférés de manière simple, sécurisée et transparente.
        </p>

        <div className="relative">
          <div className="absolute w-1 bg-green-600 h-full left-1/2 transform -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-5/12 pl-0 md:pl-16 order-2 md:order-1">
                <FaUsers className="text-5xl text-green-600 mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Participation des Électeurs</h3>
                <p className="text-gray-600">
                  Les électeurs peuvent créer un profil en ligne, choisir un candidat et valider leur parrainage en quelques clics.
                </p>
              </div>
              <div className="w-full md:w-5/12 pr-0 md:pr-16 text-right order-1 md:order-2">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto md:mx-0">
                  1
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-5/12 pr-0 md:pr-16 text-left order-1 md:order-2">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto md:mx-0">
                  2
                </div>
              </div>
              <div className="w-full md:w-5/12 pl-0 md:pl-16 order-2 md:order-1">
                <FaLock className="text-5xl text-blue-600 mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sécurité et Transparence</h3>
                <p className="text-gray-600">
                  Toutes les données sont cryptées et stockées de manière sécurisée, garantissant la confidentialité et la transparence du processus.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-5/12 pl-0 md:pl-16 order-2 md:order-1">
                <FaChartBar className="text-5xl text-purple-600 mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Suivi en Temps Réel</h3>
                <p className="text-gray-600">
                  Les candidats peuvent suivre l'évolution de leurs parrainages via un tableau de bord interactif et recevoir des notifications en temps réel.
                </p>
              </div>
              <div className="w-full md:w-5/12 pr-0 md:pr-16 text-right order-1 md:order-2">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto md:mx-0">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;