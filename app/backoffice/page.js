// app/backoffice/page.js
export default function BackOfficeHome() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-950">Bienvenue dans le BackOffice</h1>
          <p className="mb-6 text-gray-950">Veuillez sélectionner une action :</p>
  
          {/* Liste des actions disponibles */}
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <a href="/backoffice/dashboard" className="hover:underline text-blue-500">
                Tableau de Bord
              </a>
            </li>
            <li>
              <a href="/backoffice/import-electors" className="hover:underline text-blue-500">
                Importer Liste Électeurs
              </a>
            </li>
            <li>
              <a href="/backoffice/candidates" className="hover:underline text-blue-500">
                Saisie des Candidats
              </a>
            </li>
            <li>
              <a href="/backoffice/set-sponsorship-period" className="hover:underline text-blue-500">
                Ouvrir/Fermer Période de Parrainage
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }