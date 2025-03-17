import { FaUserEdit, FaImage, FaChartLine } from "react-icons/fa"; // Icônes

function CandidatsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">
          Pour les Candidats
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-center animate-fade-in-up">
          Inscrivez-vous comme candidat, gérez vos informations et suivez l'évolution de vos parrainages en temps réel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg p-8 text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <FaUserEdit className="text-5xl mx-auto mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-semibold mb-4">Étape 1</h3>
            <p className="text-sm">
              Saisissez vos informations personnelles pour vous inscrire.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg p-8 text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <FaImage className="text-5xl mx-auto mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-semibold mb-4">Étape 2</h3>
            <p className="text-sm">
              Ajoutez des détails sur votre campagne (slogan, photo, etc.).
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg p-8 text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <FaChartLine className="text-5xl mx-auto mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-semibold mb-4">Étape 3</h3>
            <p className="text-sm">
              Suivez vos parrainages via votre tableau de bord.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center animate-fade-in-up">
          <a
            href="/ListeCandidat"
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 inline-block"
          >
            Voir la liste des candidats
          </a>
        </div>
      </div>
    </section>
  );
}

export default CandidatsSection;