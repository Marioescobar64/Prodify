import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import fondoPantallaLogin from "../../../assets/img/pantalla login - copia.png";
import logoProdify from "../../../assets/img/logo Prodify.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "").toUpperCase();

    if (role.includes("ADMIN")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Fondo - Pantalla Login */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${fondoPantallaLogin}")` }}
      />
      {/* Overlay con degradado de verde esmeralda a morado */}
      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-[#32CC9A]/40 to-[#A020F0]/40" />

      {/* Contenido */}
      <div className="w-full max-w-md text-[#FFFFFF] px-8 backdrop-blur-md bg-[#1E3A8A]/85 p-8 rounded-2xl relative shadow-2xl border border-white/10">

        {/* Logo Prodify Circular */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-white flex items-center justify-center rounded-full p-4 shadow-lg overflow-hidden">
            <img
              src={logoProdify}
              alt="Logo Prodify"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Subtítulo dinámico */}
        <h2 className="text-center text-2xl tracking-wide mb-8 font-bold drop-shadow-md">
          {isLogin ? "Iniciar Sesión" : "Recuperar Contraseña"}
        </h2>

        {/* Formularios */}
        {isLogin ? (
          <LoginForm onForgot={() => setIsLogin(false)} />
        ) : (
          <ForgotPasswordForm onSwitch={() => setIsLogin(true)} />
        )}

        {/* Opciones */}
        <div className="flex justify-between text-sm mt-6 text-white/90 font-medium">
          {isLogin ? (
            <>
              <label className="flex items-center cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" className="mr-2 accent-blue-500 w-4 h-4" />
                Recordarme
              </label>

              <span
                className="cursor-pointer hover:text-white hover:underline transition-colors"
                onClick={() => setIsLogin(false)}
              >
                ¿Olvidaste tu contraseña?
              </span>
            </>
          ) : (
            <span
              className="cursor-pointer hover:text-white hover:underline transition-colors mx-auto"
              onClick={() => setIsLogin(true)}
            >
              Volver al login
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export { AuthPage };