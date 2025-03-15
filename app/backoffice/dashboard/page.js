"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    importedElectors: 0,
    registeredCandidates: 0,
    totalSponsorships: 0,
  });

  useEffect(() => {
    // Récupérer les statistiques depuis l'API
    fetch("http://localhost:8000/api/parrainage/dashboard-statistics")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Erreur lors de la récupération des statistiques :", error));
  }, []);

  // Formater les données pour Recharts
  const chartData = [
    { name: "Électeurs Importés", value: stats.importedElectors },
    { name: "Candidats Enregistrés", value: stats.registeredCandidates },
    { name: "Parrainages Totaux", value: stats.totalSponsorships },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-950 text-center">
          Tableau de Bord BackOffice
        </h1>

        {/* Graphique en barres */}
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#008000" name="Statistiques" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Affichage des statistiques sous forme de liste */}
        <ul className="mt-8 space-y-4 text-gray-600">
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">Électeurs Importés :</span>
            <span className="text-gray-800">{stats.importedElectors}</span>
          </li>
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">Candidats Enregistrés :</span>
            <span className="text-gray-800">{stats.registeredCandidates}</span>
          </li>
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">Parrainages Totaux :</span>
            <span className="text-gray-800">{stats.totalSponsorships}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;