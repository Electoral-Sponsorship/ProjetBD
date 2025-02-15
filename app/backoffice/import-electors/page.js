// app/backoffice/import-electors/page.js
"use client";

import React, { useState } from "react";

const ImportElectors = () => {
  const [file, setFile] = useState(null);
  const [checksum, setChecksum] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    try {
      const response = await fetch("/api/import-electors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file, checksum }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-gray-950">Importation des Électeurs</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer mb-4"
      />
      <input
        type="text"
        placeholder="Checksum SHA256"
        value={checksum}
        onChange={(e) => setChecksum(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Importer
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default ImportElectors;