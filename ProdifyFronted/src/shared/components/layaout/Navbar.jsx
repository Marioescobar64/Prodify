import imgLogo from "../../../assets/img/logo Prodify.png";

// Definimos las variables de color
const colorBackground = '#001A3F';
const colorPrimary = '#DAA520';
const colorGold = '#DAA520';
const colorText = '#FFFFFF';
const colorControl = '#000000';

// Aplicamos los colores a los elementos de la interfaz
export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b" style={{ backgroundColor: `${colorBackground}F2`, borderColor: `${colorPrimary}1A` }}>
      <div className="w-full px-6 h-16 flex items-center justify-between">

        {/* 🔷 IZQUIERDA */}
        <div className="flex items-center gap-4">

          <img
            src={imgLogo}
            alt="Prodify"
            className="h-9 w-auto object-contain"
          />

          {/* Línea separadora */}
          <div className="h-6 w-px" style={{ backgroundColor: `${colorPrimary}33` }} />

          <h1 className="text-lg tracking-wider font-semibold" style={{ color: colorText }}>
            Prodify
          </h1>

        </div>

        {/* 🔷 CENTRO (opcional búsqueda o título dinámico) */}
        <div className="hidden md:block">
          <p className="text-sm tracking-wide" style={{ color: `${colorPrimary}CC` }}>
            Panel Administrativo
          </p>
        </div>

        {/* 🔷 DERECHA (simple pero elegante) */}
        <div className="flex items-center gap-3">

          {/* Botón acción */}
          <button className="px-4 py-1.5 rounded-lg text-sm transition hover:opacity-80" style={{ backgroundColor: colorControl, color: colorText, border: `1px solid ${colorPrimary}` }}>
            Nuevo
          </button>

          {/* Avatar minimal */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(to bottom right, ${colorPrimary}, ${colorBackground})`, color: colorText }}>
            P
          </div>

        </div>

      </div>
    </nav>
  );
};