import { useState, useEffect } from "react";
import { 
  getDashboard, 
  getPendingTasks, 
  getOverdueTasks, 
  getSummaryPriorities, 
  getStatisticsCompletion 
} from "../../shared/api";
import { DashBoardContainer } from "../../shared/components/layaout/DashBoardContainer";
import { toast } from "react-hot-toast";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { 
  ChartBarIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationCircleIcon 
} from "@heroicons/react/24/outline";

export const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({ total_tasks: 0, pending_tasks: 0, overdue_tasks: 0 });
  const [completionStats, setCompletionStats] = useState({ porcentaje_completado: 0 });
  const [prioritySummary, setPrioritySummary] = useState({ Baja: 0, Media: 0, Alta: 0 });
  const [pendingTasksList, setPendingTasksList] = useState([]);

  useEffect(() => {
    document.title = "Panel - Productividad";
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [dashRes, compRes, prioRes, pendRes] = await Promise.all([
        getDashboard(),
        getStatisticsCompletion(),
        getSummaryPriorities(),
        getPendingTasks()
      ]);

      if (dashRes.data?.success) setDashboardData(dashRes.data.data);
      if (compRes.data?.success) setCompletionStats(compRes.data.data);
      if (prioRes.data?.success) setPrioritySummary(prioRes.data.data);
      if (pendRes.data?.success) setPendingTasksList(pendRes.data.data.slice(0, 5)); // Mostrar últimas 5
    } catch (error) {
      toast.error("Error al cargar las estadísticas de productividad");
    } finally {
      setLoading(false);
    }
  };

  const priorityData = [
    { name: "Alta", value: prioritySummary.Alta, color: "#F87171" },
    { name: "Media", value: prioritySummary.Media, color: "#FBBF24" },
    { name: "Baja", value: prioritySummary.Baja, color: "#34D399" },
  ];

  const completionData = [
    { name: "Completado", value: completionStats.porcentaje_completado, color: "#34D399" },
    { name: "Restante", value: 100 - completionStats.porcentaje_completado, color: "#374151" }
  ];

  return (
    <DashBoardContainer>
      <div className="text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Productividad</h1>
          <p className="text-gray-400">Resumen general de tus tareas y rendimiento</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18A7A1]"></div>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#0B3A66]/60 backdrop-blur-sm p-6 rounded-xl border border-[#18A7A1]/20 shadow-lg flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                  <ChartBarIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Tareas</p>
                  <p className="text-2xl font-bold">{dashboardData.total_tasks}</p>
                </div>
              </div>
              
              <div className="bg-[#0B3A66]/60 backdrop-blur-sm p-6 rounded-xl border border-[#18A7A1]/20 shadow-lg flex items-center gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400">
                  <ClockIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Pendientes</p>
                  <p className="text-2xl font-bold">{dashboardData.pending_tasks}</p>
                </div>
              </div>

              <div className="bg-[#0B3A66]/60 backdrop-blur-sm p-6 rounded-xl border border-[#18A7A1]/20 shadow-lg flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg text-red-400">
                  <ExclamationCircleIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Atrasadas</p>
                  <p className="text-2xl font-bold">{dashboardData.overdue_tasks}</p>
                </div>
              </div>

              <div className="bg-[#0B3A66]/60 backdrop-blur-sm p-6 rounded-xl border border-[#18A7A1]/20 shadow-lg flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Completitud</p>
                  <p className="text-2xl font-bold">{completionStats.porcentaje_completado}%</p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Progreso */}
              <div className="bg-[#0B3A66]/60 backdrop-blur-sm p-6 rounded-xl border border-[#18A7A1]/20 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-center">Tasa de Completitud</h2>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={completionData}
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {completionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#041F3D', borderColor: '#18A7A1' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Prioridades */}
              <div className="bg-[#0B3A66]/60 backdrop-blur-sm p-6 rounded-xl border border-[#18A7A1]/20 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-center">Resumen por Prioridad</h2>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priorityData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                      <XAxis type="number" stroke="#9ca3af" />
                      <YAxis dataKey="name" type="category" stroke="#9ca3af" />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#041F3D', borderColor: '#18A7A1' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Pending Tasks */}
            <div className="bg-[#0B3A66]/60 backdrop-blur-sm p-6 rounded-xl border border-[#18A7A1]/20 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Próximas Tareas Pendientes</h2>
              {pendingTasksList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs text-gray-400 uppercase bg-[#041F3D]/50 border-b border-[#18A7A1]/20">
                      <tr>
                        <th className="px-6 py-3">Título</th>
                        <th className="px-6 py-3">Prioridad</th>
                        <th className="px-6 py-3">Fecha Límite</th>
                        <th className="px-6 py-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingTasksList.map(task => (
                        <tr key={task._id} className="border-b border-[#18A7A1]/10 hover:bg-[#18A7A1]/5 transition-colors">
                          <td className="px-6 py-4 font-medium">{task.título}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              task.prioridad === 'Alta' ? 'bg-red-500/20 text-red-400' :
                              task.prioridad === 'Media' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {task.prioridad}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {new Date(task.fecha).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-gray-300">{task.estado}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400 py-4 text-center border border-dashed border-[#18A7A1]/30 rounded-lg">
                  No hay tareas pendientes por el momento.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </DashBoardContainer>
  );
};