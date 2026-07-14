import { Navigate, Routes, Route } from "react-router-dom";

import { AuthPage } from "../../features/auth/pages/AuthPage";

import { DashboardPage } from "../layaouts/DashboardPage";


const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("userRole") ?? "";
  const isAdmin = role.toUpperCase().includes("ADMIN");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<Navigate to="/" replace />} />

      {/* PROTEGIDO POR ROLE */}
      <Route 
        path="/dashboard" 
        element={
          <RequireAdmin>
            <DashboardPage />
          </RequireAdmin>
        }
        
        
      >
        

        
        {/* Empty dashboard for now */}
        <Route index element={<div className="text-white text-2xl">Bienvenido al Dashboard</div>} />
      </Route>

      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};