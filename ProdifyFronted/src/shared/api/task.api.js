import { axiosBackendA } from "./api";

export const getTasks = async (params) => axiosBackendA.get("/tasks", { params });
export const getTaskById = async (id) => axiosBackendA.get(`/tasks/${id}`);
export const createTask = async (data) => axiosBackendA.post("/tasks", data);
export const updateTask = async (id, data) => axiosBackendA.put(`/tasks/${id}`, data);
export const deleteTask = async (id) => axiosBackendA.delete(`/tasks/${id}`);
export const updateTaskStatus = async (id, estado) => axiosBackendA.patch(`/tasks/${id}/status`, { estado });
