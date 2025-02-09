'use client'
import { useState } from "react";
import { FileDown, FolderUp, Lightbulb } from "lucide-react";
import Button from "../elements/ButtonUpload";

function ListElector() {
  // État pour stocker le fichier sélectionné
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  // Fonction pour gérer l'upload du fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError("Aucun fichier sélectionné.");
      return;
    }

    // Vérifier que le fichier est bien un CSV
    if (file.type !== "text/csv") {
      setError("Veuillez importer un fichier au format CSV.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="mx-auto max-w-5xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-green-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#00853F" />
                <stop offset={0.5} stopColor="#FDEF42" />
                <stop offset={1} stopColor="#E31B23" />
              </radialGradient>
            </defs>
          </svg>

          {/* Contenu principal */}
          <div className="flex flex-col items-center justify-center text-center max-w-md w-full lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <div className="flex flex-col items-center gap-6 p-6 text-white rounded-lg border-2 border-green-800">
              <h1 className="text-2xl font-bold mb-4">Importation du fichier électoral</h1>

              {/* Instructions */}
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-2">
                  {/* Icône */}
                  <FileDown className="text-white text-4xl" />
                  <p>1- Veuillez importer le fichier électoral au format CSV et saisir l’empreinte CHECKSUM SHA256 pour validation.</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  {/* Icône */}
                  <Lightbulb className="text-white text-4xl" />
                  <p>2- Assurez-vous que le fichier respecte l’encodage UTF-8 et le format attendu avant de l’importer.</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  {/* Icône */}
                  <FolderUp className="text-white text-4xl" />
                  <p>3- Importer le fichier :</p>
                </div>
              </div>

              {/* Input pour l'upload du fichier */}
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload} 
                className="border rounded p-2 mb-4"
              />

              {/* Affichage du fichier sélectionné */}
              {selectedFile && (
                <p className="text-green-200">✅ Fichier sélectionné : {selectedFile.name}</p>
              )}

              {/* Affichage des erreurs */}
              {error && <p className="text-red-200">❌ {error}</p>}

              {/* Bouton pour soumettre le fichier (positionné en bas) */}
              <div className="mt-auto w-full">
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListElector;
