'use client';
import { useState } from "react";
import { FileDown, FolderUp, Lightbulb } from "lucide-react";

function ListElector() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [checksum, setChecksum] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // État pour le loader

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError("Aucun fichier sélectionné.");
      return;
    }

    if (file.type !== "text/csv") {
      setError("Veuillez importer un fichier au format CSV.");
      return;
    }

    setSelectedFile(file);
    setError(""); // Réinitialiser les erreurs
  };

  const handleChecksumChange = (event) => {
    setChecksum(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Veuillez d'abord sélectionner un fichier.");
      return;
    }

    if (!checksum) {
      setError("Veuillez saisir l'empreinte CHECKSUM.");
      return;
    }

    setIsLoading(true); // Activer le loader
    setError(""); // Réinitialiser les erreurs
    setMessage(""); // Réinitialiser les messages

    const formData = new FormData();
    formData.append("electoral_file", selectedFile);
    formData.append("checksum", checksum);
    formData.append("idAdmin", "1");

    try {
      // Step 1: Check the electoral file
        const checkResponse = await fetch(`http://localhost:8000/api/check-electoral-file`, {
        method: "POST",
        body: formData,
      });

      const checkResult = await checkResponse.json();

      if (!checkResponse.ok) {
        setError(checkResult.description || "Une erreur s'est produite lors de la vérification du fichier.");
        setIsLoading(false); // Désactiver le loader
        return;
      }

      // Step 2: If the file is valid, proceed to validate and transfer data
      if (checkResult.status === "success") {
        const validateResponse = await fetch(`http://localhost:8000/api/validate-import`, {
          method: "POST",
        });

        const validateResult = await validateResponse.json();

        if (validateResponse.ok) {
          setMessage(validateResult.description || "Données transférées avec succès vers la table persistante.");
          setSelectedFile(null);
          setChecksum("");
        } else {
          setError(validateResult.description || "Une erreur s'est produite lors du transfert des données.");
        }
      } else {
        setError(checkResult.description || "Le fichier n'est pas valide.");
      }
    } catch (error) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false); // Désactiver le loader dans tous les cas
    }
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

              {/* Input pour l'empreinte CHECKSUM */}
              <input
                type="text"
                placeholder="Saisir l'empreinte CHECKSUM"
                value={checksum}
                onChange={handleChecksumChange}
                className="border rounded p-2 mb-3 w-full"
              />

              {/* Affichage du fichier sélectionné */}
              {selectedFile && <p className="text-green-200 text-sm">✅ {selectedFile.name}</p>}

              {/* Affichage des erreurs */}
              {error && <p className="text-red-200 text-sm">❌ {error}</p>}

              {/* Affichage des messages de succès */}
              {message && <p className="text-green-200 text-sm">✅ {message}</p>}

              {/* Bouton pour soumettre le fichier */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Traitement en cours...
                  </div>
                ) : (
                  "Importer"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListElector;