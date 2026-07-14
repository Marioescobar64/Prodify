import Task from './task-model.js';

export const getTasks = async (req, res) => {
    try {
        const { título, estado, prioridad } = req.query;
        const query = { userId: req.userId }; 

        if (título) query.título = new RegExp(título, 'i');
        if (estado) query.estado = estado;
        if (prioridad) query.prioridad = prioridad;

        const tasks = await Task.find(query);
        res.json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las tareas', error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
        }
        res.json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la tarea', error: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { título, descripción, prioridad, estado, fecha } = req.body;
        const task = new Task({
            título,
            descripción,
            prioridad,
            estado,
            fecha,
            userId: req.userId
        });
        await task.save();
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la tarea', error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId },
            updates,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
        }
        res.json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar la tarea', error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
        }
        res.json({ success: true, message: 'Tarea eliminada correctamente', data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar la tarea', error: error.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!['Pendiente', 'En Progreso', 'Completada'].includes(estado)) {
            return res.status(400).json({ success: false, message: 'Estado no válido' });
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { estado },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
        }
        res.json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar estado', error: error.message });
    }
};
