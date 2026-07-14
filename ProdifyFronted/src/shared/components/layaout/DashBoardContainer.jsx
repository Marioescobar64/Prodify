import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import fondo from "../../../assets/img/pantalla Dashboard.png";

// Definimos las variables de color
const colorBackground = '#001A3F';
const colorPrimary = '#DAA520';
const colorGold = '#DAA520';
const colorText = '#FFFFFF';
const colorControl = '#000000';

// Aplicamos los colores a los elementos de la interfaz
export const DashBoardContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: colorBackground, color: colorText }}>
      
      {/* Imagen de fondo global (opcional, si quieres que cubra todo) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${fondo})`, opacity: 0.2 }}
      />

      {/* Navbar */}
      <div className="relative z-10 backdrop-blur-md border-b" style={{ backgroundColor: `${colorBackground}E6`, borderColor: `${colorPrimary}4D` }}>
        <Navbar />
      </div>

      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <div className="backdrop-blur-md border-r min-w-[220px]" style={{ backgroundColor: `${colorBackground}F2`, borderColor: `${colorPrimary}33` }}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="relative rounded-xl overflow-hidden shadow-lg border backdrop-blur-sm p-6" style={{ backgroundColor: `${colorBackground}66`, borderColor: `${colorPrimary}33` }}>
            {/* Aquí es donde se inyectarán las otras clases/componentes */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};