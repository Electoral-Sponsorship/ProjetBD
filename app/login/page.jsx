"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast, ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/hooks/use-toast";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
    const data = await response.json();

    if (data.length === 0) {
      toast({
        title: "Erreur",
        description: "❌ Email ou Mot de passe incorrect(s).",
        action: <ToastAction altText="Try again">"Veuillez Réessayer"</ToastAction>,
      });
      return;
    }
    toast({
      title: "✅Connexion Réussie",
      description: `Bienvenue ${data[0].username} .`,
      variant: "success",
    });

    // ✅ Stocker l'utilisateur dans localStorage
    localStorage.setItem("user", JSON.stringify(data[0]));

    // 🔄 Rediriger vers le BackOffice après connexion
    router.push("/backoffice");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-green-600">Connexion Administrateur</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
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
          <button type="submit" className="w-full mt-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            Se connecter
          </button>
          <h3 className="text-red-500 mt-2">NB:Interface réservée aux membres du DGE</h3>
        </form>
      </div>
    </div>
  );
}
