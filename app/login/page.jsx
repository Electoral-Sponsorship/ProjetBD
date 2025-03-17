"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast, ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Ajout d'un état pour le chargement

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://projetbd-production-8efe.up.railway.app/api/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new error(data.message || "Une erreur est survenue");
    }
    // localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.admin));
    toast({
      title: "✅Connexion Réussie",
      description: `Bienvenue ${data.admin.email} .`,
      variant: "success",
    });

    // ✅ Stocker l'utilisateur dans localStorage
    // localStorage.setItem("user", JSON.stringify(data[0]));

    // 🔄 Rediriger vers le BackOffice après connexion
    router.push("/backoffice");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-green-600">Connexion Administrateur</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-3 mt-4 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-3 mt-4 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            disabled={loading} // Désactiver le bouton si en cours de chargement
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          <h3 className="text-red-500 mt-2">NB: Interface réservée aux membres du DGE</h3>
        </form>
      </div>
    </div>
  );
}
