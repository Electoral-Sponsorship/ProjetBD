import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Icônes de réseaux sociaux

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">À propos</h3>
            <p className="text-gray-400">
              Une plateforme numérique sécurisée pour simplifier la gestion des parrainages électoraux.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/parrain"
                  className="flex items-center text-gray-400 hover:text-green-500 transition duration-300"
                >
                  <span className="mr-2">+</span> Enregistrer votre profil parrain
                </a>
              </li>
              <li>
                <a
                  href="/ListeCandidat"
                  className="flex items-center text-gray-400 hover:text-green-500 transition duration-300"
                >
                  <span className="mr-2">+</span> Voir la liste des candidats
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">Contact</h3>
            <p className="text-gray-400 flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              parrainage_sn@gmail.com
            </p>
            <p className="text-gray-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-1.264 1.012a1 1 0 00-.616.929l-3.222 2.147a1 1 0 01-1.41-.188l-1.498-4.493A2 2 0 013 5z"
                />
              </svg>
              +221 33 456 78 49
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition duration-300"
          >
            <FaFacebook className="text-2xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition duration-300"
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition duration-300"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition duration-300"
          >
            <FaLinkedin className="text-2xl" />
          </a>
        </div>

        <div className="mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Gestion des Parrainages Électoraux.
        </div>
      </div>
    </footer>
  );
}

export default Footer;