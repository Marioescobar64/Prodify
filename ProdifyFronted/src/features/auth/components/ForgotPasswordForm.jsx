export const ForgotPasswordForm = ({ onSwitch }) => {
  return (
    <form className="space-y-5">
      
      {/* Campo Email */}
      <div>
        <label className="block text-sm font-medium text-[#FFFFFF] mb-1.5 drop-shadow-sm">
          Email
        </label>

        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-transparent rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
        />
      </div>

      {/* Botón submit */}
      <button
        type="submit"
        className="w-full bg-[#3b82f6] text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-[#2563eb] shadow-lg transition-all duration-200 mt-2"
      >
        Enviar correo
      </button>

      {/* Volver a login */}
      <p className="text-center text-sm hidden">
        {/* El link se movió a AuthPage.jsx */}
      </p>

    </form>
  );
};