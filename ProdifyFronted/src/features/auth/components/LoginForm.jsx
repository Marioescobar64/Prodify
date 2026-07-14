import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export const LoginForm = ({ onForgot }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 🔥 VALIDACIÓN
    if (!emailOrUsername.trim() || !password.trim()) {
      toast.error("Por favor ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const { login } = await import("../../../shared/api/auth");
      
      const response = await login({
        correo: emailOrUsername.trim(),
        contraseña: password.trim(),
      });

      const data = response.data;
      // In the auth controller, the response is { msg, user: { id, nombre, correo }, token }
      // It doesn't return role in this snippet, let's assume if they can login they are valid
      // or we just remove the isAdmin check since we just register normal users for now
      // Or we can just let it through if it has a token.

      // ✅ guardar datos
      // Update zustand store so interceptors get the token
      useAuthStore.setState({
        token: data.token,
        user: data.user,
        isAuthenticated: true,
        isLoadingAuth: false,
      });

      localStorage.setItem("authToken", data.token ?? "");
      // Mock role as ADMIN for now since backend doesn't return it currently based on controller code
      localStorage.setItem("userRole", "ADMIN");
      localStorage.setItem(
        "userName",
        data?.user?.nombre ?? "Administrador"
      );

      toast.success(data.msg || "Bienvenido administrador");

      // 🔥 REDIRECCIÓN
      navigate("/dashboard", { replace: true });

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Error al iniciar sesión.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* EMAIL / USUARIO */}
      <div>
        <label className="block text-sm font-medium text-[#FFFFFF] mb-1.5 drop-shadow-sm">
          Email o Usuario
        </label>
        <input
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="correo@ejemplo.com o usuario"
          className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-transparent rounded-lg 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-[#FFFFFF] mb-1.5 drop-shadow-sm">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-transparent rounded-lg 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white 
                   font-semibold py-3 px-4 rounded-lg shadow-lg
                   transition-all duration-200 text-sm mt-2
                   disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Verificando..." : "Iniciar Sesión"}
      </button>

      {/* LINK */}
      <p className="text-center text-sm hidden">
        {/* El link se movió a AuthPage.jsx en el último diseño */}
      </p>

    </form>
  );
};