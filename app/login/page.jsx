import React from "react";
import { FaGoogle, FaApple, FaTwitter } from "react-icons/fa";

const Form = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-green-600">Se Connecter</h2>
        <form className="mt-6">
          <input
            type="email"
            placeholder="abzo@gmail.com"
            className="w-full px-4 py-3 mt-4 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mt-4 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
          <div className="text-right mt-2">
            <a href="#" className="text-sm text-green-500 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Se connecter
          </button>
        </form>
         <div className="mt-6 text-center text-gray-500 text-sm">Vos identifiants sont strictements personnels</div> 
        
        <div className="text-center mt-4 text-sm">
          {/* <a href="#" className="text-green-500 hover:underline">
           Mot de passe oublié
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Form;
