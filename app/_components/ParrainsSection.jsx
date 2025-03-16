import { FaUserPlus, FaCheckCircle, FaHandPointer } from "react-icons/fa"; 

function ParrainsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center animate-fade-in-up">
          Pour les Parrains
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-center animate-fade-in-up">
          Enregistrez votre profil en quelques étapes simples et soutenez votre candidat préféré.
        </p>

        <div className="space-y-12">
          <div className="flex items-center justify-between relative">
            <div className="w-1/3 flex justify-end pr-8">
              <FaUserPlus className="text-6xl text-green-600 transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="w-2/3 pl-8">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Étape 1</h3>
              <p className="text-gray-600">
                Créez un compte en saisissant vos informations personnelles.
              </p>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
          </div>

          <div className="flex items-center justify-between relative">
            <div className="w-1/3 flex justify-end pr-8">
              <FaHandPointer className="text-6xl text-green-600 transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="w-2/3 pl-8">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Étape 2</h3>
              <p className="text-gray-600">
                Choisissez un candidat dans la liste disponible.
              </p>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
          </div>

          <div className="flex items-center justify-between relative">
            <div className="w-1/3 flex justify-end pr-8">
              <FaCheckCircle className="text-6xl text-green-600 transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="w-2/3 pl-8">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Étape 3</h3>
              <p className="text-gray-600">
                Validez votre parrainage et recevez une confirmation.
              </p>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center animate-fade-in-up">
          <a
            href="/parrain"
            className="bg-gradient-to-br from-green-500 to-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 inline-block"
          >
            Enregistrer votre profil parrain
          </a>
        </div>
      </div>
    </section>
  );
}

export default ParrainsSection;