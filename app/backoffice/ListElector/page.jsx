'use client'
import { useState } from "react";
import { FileDown, FolderUp, Lightbulb } from "lucide-react";
import Button from "../../elements/ButtonUpload";

function ListElector() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError("Aucun fichier sélectionné.");
      return;
    }

    if (file.type !== "text/csv") {
      setError("Veuillez importer un fichier au format CSV.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <div className="mx-auto max-w-4xl py-12 sm:py-16 px-6 sm:px-8 lg:px-12">
        <div className="relative isolate overflow-hidden bg-green-900 px-6 pt-12 pb-8 shadow-2xl sm:rounded-2xl sm:px-8 max-h-[80vh] overflow-y-auto">
          {/* Contenu principal */}
          <div className="flex flex-col items-center text-center max-w-md w-full mx-auto">
            <div className="flex flex-col items-center gap-4 p-4 sm:p-6 text-white rounded-lg border-2 border-green-800">
              <h1 className="text-xl font-bold mb-4">Importation du fichier électoral</h1>

              {/* Instructions */}
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <FileDown className="text-white text-3xl" />
                  <p className="text-sm">1- Veuillez importer le fichier électoral au format CSV et saisir l’empreinte CHECKSUM SHA256.</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Lightbulb className="text-white text-3xl" />
                  <p className="text-sm">2- Assurez-vous que le fichier respecte l’encodage UTF-8 et le format attendu.</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <FolderUp className="text-white text-3xl" />
                  <p className="text-sm">3- Importer le fichier :</p>
                </div>
              </div>

              {/* Input pour l'upload du fichier */}
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload} 
                className="border rounded p-2 mb-3"
              />

              {/* Affichage du fichier sélectionné */}
              {selectedFile && <p className="text-green-200 text-sm">✅ {selectedFile.name}</p>}

              {/* Affichage des erreurs */}
              {error && <p className="text-red-200 text-sm">❌ {error}</p>}

              {/* Bouton pour soumettre le fichier */}
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
