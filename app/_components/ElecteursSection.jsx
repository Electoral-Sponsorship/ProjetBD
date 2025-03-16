import { FaUserPlus, FaCheckCircle, FaHandPointer } from "react-icons/fa"; // Icônes

function ElecteursSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">
          Pour les Électeurs
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-center animate-fade-in-up">
          Enregistrez votre profil en quelques étapes simples et soutenez votre candidat préféré.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-4 border-green-200 rounded-lg p-8 text-center hover:border-green-300 transition duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <FaUserPlus className="text-5xl text-green-600 mx-auto mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Étape 1</h3>
            <p className="text-gray-600">
              Créez un compte en saisissant vos informations personnelles.
            </p>
          </div>

          <div className="border-4 border-blue-200 rounded-lg p-8 text-center hover:border-blue-300 transition duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <FaHandPointer className="text-5xl text-blue-600 mx-auto mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Étape 2</h3>
            <p className="text-gray-600">
              Choisissez un candidat dans la liste disponible.
            </p>
          </div>

          <div className="border-4 border-purple-200 rounded-lg p-8 text-center hover:border-purple-300 transition duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <FaCheckCircle className="text-5xl text-purple-600 mx-auto mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Étape 3</h3>
            <p className="text-gray-600">
              Validez votre parrainage et recevez une confirmation.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center animate-fade-in-up">
          <a
            href="/parrain"
            className="bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300 inline-block"
          >
            Enregistrer votre profil parrain
          </a>
        </div>
      </div>
    </section>
  );
}

export default ElecteursSection;