import { useState, useEffect } from "react";
import { createTask, updateTask } from "../../../shared/api";
import { toast } from "react-hot-toast";

import { createPortal } from "react-dom";

export const TaskModal = ({ isOpen, onClose, task, onSaved }) => {
  const [título, setTítulo] = useState("");
  const [descripción, setDescripción] = useState("");
  const [prioridad, setPrioridad] = useState("Media");
  const [estado, setEstado] = useState("Pendiente");
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTítulo(task.título || "");
      setDescripción(task.descripción || "");
      setPrioridad(task.prioridad || "Media");
      setEstado(task.estado || "Pendiente");
      setFecha(task.fecha ? new Date(task.fecha).toISOString().split('T')[0] : "");
    } else {
      setTítulo("");
      setDescripción("");
      setPrioridad("Media");
      setEstado("Pendiente");
      setFecha(new Date().toISOString().split('T')[0]);
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!título.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    setLoading(true);
    try {
      const data = { título, descripción, prioridad, estado, fecha };
      if (task) {
        await updateTask(task._id, data);
        toast.success("Tarea actualizada");
      } else {
        await createTask(data);
        toast.success("Tarea creada");
      }
      onSaved();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al guardar la tarea");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0B3A66] rounded-xl border border-[#18A7A1]/30 p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">
          {task ? "Editar Tarea" : "Nueva Tarea"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Título</label>
            <input 
              type="text" 
              value={título} 
              onChange={e => setTítulo(e.target.value)}
              className="w-full bg-[#041F3D] border border-[#18A7A1]/30 rounded px-3 py-2 text-white outline-none focus:border-[#18A7A1]"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-1">Descripción</label>
            <textarea 
              value={descripción} 
              onChange={e => setDescripción(e.target.value)}
              className="w-full bg-[#041F3D] border border-[#18A7A1]/30 rounded px-3 py-2 text-white outline-none focus:border-[#18A7A1] min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Prioridad</label>
              <select 
                value={prioridad} 
                onChange={e => setPrioridad(e.target.value)}
                className="w-full bg-[#041F3D] border border-[#18A7A1]/30 rounded px-3 py-2 text-white outline-none focus:border-[#18A7A1]"
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Estado</label>
              <select 
                value={estado} 
                onChange={e => setEstado(e.target.value)}
                className="w-full bg-[#041F3D] border border-[#18A7A1]/30 rounded px-3 py-2 text-white outline-none focus:border-[#18A7A1]"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-1">Fecha Límite</label>
            <input 
              type="date" 
              value={fecha} 
              onChange={e => setFecha(e.target.value)}
              className="w-full bg-[#041F3D] border border-[#18A7A1]/30 rounded px-3 py-2 text-white outline-none focus:border-[#18A7A1]"
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#18A7A1] hover:bg-[#138883] text-white px-4 py-2 rounded-lg transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
