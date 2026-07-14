import axios from 'axios';

const fetchTasksFromServiceA = async (req) => {
    try {
        const TASKS_API_URL = process.env.SERVICEB;
        const token = req.header('Authorization');
        const response = await axios.get(TASKS_API_URL, {
            headers: { Authorization: token }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching tasks from Service A:', error.message);
        throw new Error('No se pudieron obtener las tareas del Servicio A');
    }
};

export const getDashboard = async (req, res) => {
    try {
        const tasks = await fetchTasksFromServiceA(req);
        const total = tasks.length;
        const completadas = tasks.filter(t => t.estado === 'Completada').length;
        const pendientes = tasks.filter(t => t.estado === 'Pendiente').length;
        const enProgreso = tasks.filter(t => t.estado === 'En Progreso').length;

        res.json({
            success: true,
            data: {
                total,
                completadas,
                pendientes,
                enProgreso
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPendingTasks = async (req, res) => {
    try {
        const tasks = await fetchTasksFromServiceA(req);
        const pendientes = tasks.filter(t => t.estado === 'Pendiente' || t.estado === 'En Progreso');
        res.json({ success: true, data: pendientes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOverdueTasks = async (req, res) => {
    try {
        const tasks = await fetchTasksFromServiceA(req);
        const now = new Date();
        const overdue = tasks.filter(t => {
            const dueDate = new Date(t.fecha);
            return dueDate < now && t.estado !== 'Completada';
        });
        res.json({ success: true, data: overdue });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSummaryPriorities = async (req, res) => {
    try {
        const tasks = await fetchTasksFromServiceA(req);
        const summary = { Baja: 0, Media: 0, Alta: 0 };
        tasks.forEach(t => {
            if (summary[t.prioridad] !== undefined) {
                summary[t.prioridad]++;
            }
        });
        res.json({ success: true, data: summary });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStatisticsCompletion = async (req, res) => {
    try {
        const tasks = await fetchTasksFromServiceA(req);
        const total = tasks.length;
        if (total === 0) {
            return res.json({ success: true, data: { porcentaje_completado: 0 } });
        }
        const completadas = tasks.filter(t => t.estado === 'Completada').length;
        const porcentaje = (completadas / total) * 100;
        res.json({ success: true, data: { porcentaje_completado: parseFloat(porcentaje.toFixed(2)) } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
