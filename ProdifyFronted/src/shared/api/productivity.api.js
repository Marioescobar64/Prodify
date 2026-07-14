import { axiosBackendB } from "./api";

export const getDashboard = async () => axiosBackendB.get("/dashboard");
export const getPendingTasks = async () => axiosBackendB.get("/tasks/pending");
export const getOverdueTasks = async () => axiosBackendB.get("/tasks/overdue");
export const getSummaryPriorities = async () => axiosBackendB.get("/summary/priorities");
export const getStatisticsCompletion = async () => axiosBackendB.get("/statistics/completion");
