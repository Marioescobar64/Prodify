import { useNavigate, useLocation } from "react-router-dom";
import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  UserIcon,
  ShieldCheckIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

// Definimos las variables de color
const colorBackground = '#001A3F';
const colorPrimary = '#DAA520';
const colorGold = '#DAA520';
const colorText = '#FFFFFF';
const colorControl = '#000000';

// Aplicamos los colores a los elementos de la interfaz
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="w-64 border-r min-h-[calc(100vh-4rem)] p-5 shadow-[4px_0_20px_rgba(0,0,0,0.03)] flex flex-col" style={{ background: `linear-gradient(to bottom, ${colorBackground}, ${colorControl})`, borderColor: `${colorPrimary}1A` }}>
      {/* Decoración superior sutil */}
      <div className="mb-6 px-4">
        <div className="h-1.5 w-10 rounded-full opacity-50" style={{ backgroundColor: colorPrimary }}></div>
      </div>

      <nav className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-1.5">
          {items.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`
                    relative w-full group flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold 
                    transition-all duration-300 ease-in-out
                    ${active ? "shadow-md scale-[1.02]" : "hover:opacity-80"}
                  `}
                  style={{ 
                    backgroundColor: active ? colorPrimary : 'transparent',
                    color: active ? colorControl : colorText
                  }}
                >
                  {/* Indicador lateral activo */}
                  {active && (
                    <span className="absolute left-0 w-1.5 h-6 rounded-r-full" style={{ backgroundColor: colorText }} />
                  )}
                  
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  
                  <span className="text-[14px] tracking-tight">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Botón de Cerrar Sesión Estilizado */}
      <div className="mt-6 pt-6 border-t" style={{ borderColor: `${colorPrimary}1A` }}>
        <button
          onClick={handleLogout}
          className="
            group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl font-bold
            shadow-lg
            transition-all duration-300
            hover:-translate-y-0.5
            active:scale-95
            cursor-pointer
          "
          style={{ 
            background: `linear-gradient(to right, ${colorPrimary}, ${colorGold})`,
            color: colorControl,
            boxShadow: `0 10px 15px -3px ${colorPrimary}33`
          }}
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Cerrar Sesión</span>
        </button>
        <p className="text-[10px] text-center mt-4 uppercase tracking-[0.2em] font-bold" style={{ color: `${colorText}66` }}>
          System Panel v2.0
        </p>
      </div>
    </aside>
  );
};