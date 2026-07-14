import { useState, useEffect } from "react";
import { getTasks, updateTaskStatus, deleteTask } from "../../shared/api";
import { TaskModal } from "./components/TaskModal";
import { toast } from "react-hot-toast";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DashBoardContainer } from "../../shared/components/layaout/DashBoardContainer";

export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      if (res.data?.success) {
        setTasks(res.data.data);
      }
    } catch (error) {
      toast.error("Error al cargar tareas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta tarea?")) return;
    try {
      await deleteTask(id);
      toast.success("Tarea eliminada");
      fetchTasks();
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      toast.success("Estado actualizado");
      fetchTasks();
    } catch (error) {
      toast.error("Error al actualizar estado");
    }
  };

  return (
    <DashBoardContainer>
      <div className="text-white space-y-6">
        <div className="flex justify-between items-center bg-[#041F3D]/60 p-4 rounded-xl border border-[#18A7A1]/20 shadow-lg">
          <h1 className="text-2xl font-bold">Mis Tareas</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#18A7A1] hover:bg-[#138883] text-white px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <PlusIcon className="w-5 h-5" /> Nueva Tarea
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">Cargando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task._id} className="bg-[#0B3A66]/60 backdrop-blur-sm p-5 rounded-xl border border-[#18A7A1]/20 shadow-lg relative flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold pr-8">{task.título}</h3>
                  <div className="flex gap-2 absolute top-4 right-4">
                    <button onClick={() => handleOpenModal(task)} className="text-blue-400 hover:text-blue-300 transition-colors">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="text-red-400 hover:text-red-300 transition-colors">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-300 flex-1 mb-4">{task.descripción}</p>
                
                <div className="flex flex-col gap-2 text-sm mt-auto">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prioridad:</span>
                    <span className={`font-medium ${task.prioridad === 'Alta' ? 'text-red-400' : task.prioridad === 'Media' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {task.prioridad}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fecha:</span>
                    <span>{new Date(task.fecha).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#18A7A1]/20">
                    <span className="text-gray-400">Estado:</span>
                    <select 
                      value={task.estado} 
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className="bg-[#041F3D] border border-[#18A7A1]/30 rounded px-2 py-1 outline-none focus:border-[#18A7A1] text-xs"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Progreso">En Progreso</option>
                      <option value="Completada">Completada</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            {tasks.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-400 bg-[#0B3A66]/30 rounded-xl border border-dashed border-[#18A7A1]/30">
                No tienes tareas pendientes. ¡Crea una nueva!
              </div>
            )}
          </div>
        )}

        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          task={editingTask} 
          onSaved={fetchTasks} 
        />
      </div>
    </DashBoardContainer>
  );
};
