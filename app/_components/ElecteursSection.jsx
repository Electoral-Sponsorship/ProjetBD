import { FaList, FaChartBar, FaCalendarAlt } from "react-icons/fa";

function ElecteursSection() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center animate-fade-in-up">
          Pour les Électeurs
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-center animate-fade-in-up">
          Informez-vous sur les candidats, suivez les résultats des parrainages et restez à jour avec les élections.
        </p>

        <div className="space-y-12">
          {/* Étape 1 */}
          <div className="flex items-center justify-between relative">
            <div className="w-1/3 flex justify-end pr-8">
              <FaList className="text-6xl text-blue-600 transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="w-2/3 pl-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Étape 1</h3>
              <p className="text-gray-600">
                Consultez la liste complète des candidats et leurs programmes.
              </p>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
          </div>

          <div className="flex items-center justify-between relative">
            <div className="w-1/3 flex justify-end pr-8">
              <FaChartBar className="text-6xl text-blue-600 transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="w-2/3 pl-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Étape 2</h3>
              <p className="text-gray-600">
                Suivez les résultats des parrainages en temps réel.
              </p>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
          </div>

          <div className="flex items-center justify-between relative">
            <div className="w-1/3 flex justify-end pr-8">
              <FaCalendarAlt className="text-6xl text-blue-600 transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="w-2/3 pl-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Étape 3</h3>
              <p className="text-gray-600">
                Restez informé sur les dates importantes des élections.
              </p>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ElecteursSection;