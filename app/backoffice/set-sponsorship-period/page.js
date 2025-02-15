// app/backoffice/set-sponsorship-period/page.js
"use client";

import React, { useState } from "react";

const SetSponsorshipPeriod = () => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/set-sponsorship-period", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dates),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Ouvrir/Fermer Période de Parrainage</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-gray-950">
          <label className="block font-bold mb-2">Date de Début :</label>
          <input
            type="date"
            name="startDate"
            value={dates.startDate}
            onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Date de Fin :</label>
          <input
            type="date"
            name="endDate"
            value={dates.endDate}
            onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Valider
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default SetSponsorshipPeriod;