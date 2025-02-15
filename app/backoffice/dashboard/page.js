// app/backoffice/dashboard/page.js
"use client";

import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    importedElectors: 0,
    registeredCandidates: 0,
    totalSponsorships: 0,
  });

  useEffect(() => {
    // Simuler la récupération des statistiques depuis une API
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-950">Tableau de Bord BackOffice</h1>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>
            <strong>Électeurs Importés :</strong> {stats.importedElectors}
          </li>
          <li>
            <strong>Candidats Enregistrés :</strong> {stats.registeredCandidates}
          </li>
          <li>
            <strong>Parrainages Totaux :</strong> {stats.totalSponsorships}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;