"use client"
import { useEffect } from "react";

const testLogin = async () => {
    console.log("🔍 Test de connexion en cours...");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/login", {
            method: "POST",
            headers:
            
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "admin@gmail.com", // Remplace avec un email valide
                password: "passer",   // Remplace avec un mot de passe valide
            }),
        });

        console.log("📡 Requête envoyée...");

        const data = await response.json();
        console.log("✅ Réponse de l'API :", data);
    } catch (error) {
        console.error("❌ Erreur lors de la requête :", error);
    }
};

// ✅ Ajoute un composant React pour éviter l'erreur
export default function TestLoginPage() {
    useEffect(() => {
        testLogin();
    }, []);

    return <div>Test Login Page</div>;
}
