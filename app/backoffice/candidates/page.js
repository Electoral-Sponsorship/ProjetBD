// app/backoffice/candidates/page.js
"use client";

import React, { useState } from "react";

const CandidateRegistration = () => {
  const [formData, setFormData] = useState({
    voterId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    party: "",
    slogan: "",
    photo: null,
    colors: [],
    url: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-600 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Saisie des Candidats</h1>
      <form onSubmit={handleSubmit}>
        {/* Champs du formulaire */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Numéro de Carte d'Électeur :</label>
          <input
            type="text"
            name="voterId"
            value={formData.voterId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-900">Nom :</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Prénom :</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Adresse Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Numéro de Téléphone :</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Nom du Parti Politique :</label>
          <input
            type="text"
            name="party"
            value={formData.party}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Slogan :</label>
          <input
            type="text"
            name="slogan"
            value={formData.slogan}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-gray-6bg-gray-600 px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default CandidateRegistration;