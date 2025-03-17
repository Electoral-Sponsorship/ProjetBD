import Image from "next/image";
import { FaUserPlus, FaList, FaArrowRight } from "react-icons/fa";

function HeroSection() {
  return (
    <section className="h-screen relative bg-gradient-to-r from-green-600 to-blue-500 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
				<Image
				src="https://upload.wikimedia.org/wikipedia/commons/9/90/Palais_pr%C3%A9sidentiel_%C3%A0_Dakar.JPG"
				alt="Background"
				fill
				style={{ objectFit: "cover" }}
				className="opacity-50"
			/>
      </div>

      <div className="container mx-auto relative z-10 text-center px-4 flex flex-col justify-center h-full">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-md animate-fade-in-up">
          Gestion des Parrainages pour les Élections Présidentielles
        </h1>
        <p className="text-xl mb-8 drop-shadow-sm animate-fade-in-up">
          Une plateforme numérique pour simplifier et sécuriser le processus de parrainage.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
          <a
            href="/parrain"
            className="flex items-center justify-center bg-white text-green-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            <FaUserPlus className="mr-2 text-xl" /> Enregistrer votre profil parrain
          </a>

          <a
            href="/ListeCandidat"
            className="flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-white hover:text-green-700 transition duration-300 transform hover:scale-105"
          >
            <FaList className="mr-2 text-xl" /> Voir la liste des candidats
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;