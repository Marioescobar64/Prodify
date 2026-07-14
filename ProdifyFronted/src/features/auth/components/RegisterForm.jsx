import { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosAuth } from "../../../shared/api/api";

export const RegisterForm = ({ onSwitchToLogin }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre.trim() || !correo.trim() || !contraseña.trim()) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosAuth.post("/auth/register", {
        nombre: nombre.trim(),
        correo: correo.trim(),
        contraseña: contraseña.trim(),
      });

      if (response.data) {
        toast.success("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
        onSwitchToLogin();
      }
    } catch (error) {
      const message =
        error?.response?.data?.msg ||
        error?.message ||
        "Error al registrar usuario.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* NOMBRE */}
      <div>
        <label className="block text-sm font-medium text-[#FFFFFF] mb-1.5 drop-shadow-sm">
          Nombre Completo
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Juan Pérez"
          className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-transparent rounded-lg 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
        />
      </div>

      {/* CORREO */}
      <div>
        <label className="block text-sm font-medium text-[#FFFFFF] mb-1.5 drop-shadow-sm">
          Correo Electrónico
        </label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="correo@ejemplo.com"
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
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-transparent rounded-lg 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#10b981] hover:bg-[#059669] text-white 
                   font-semibold py-3 px-4 rounded-lg shadow-lg
                   transition-all duration-200 text-sm mt-2
                   disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Registrando..." : "Crear Cuenta"}
      </button>

    </form>
  );
};
