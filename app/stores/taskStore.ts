import { create } from "zustand";
import api from "@/api/api";
import Task from "../interfaces/Task";

interface TaskState {
  tasks: Task[];
  task: Task;
  loadingTask: boolean;
  loadingTasksCalendar: boolean;
  calendarTasks: Task[];
  fetchTasks: (date: Date, authToken: string) => Promise<void>;
  fetchCalendarTasks: (date: Date, authToken: string) => Promise<void>;
  fetchTask: (id: string) => Promise<void>;
  addTask: (task: any, authToken: string) => Promise<void>;
  updateTask: (
    id: string,
    updatedTask: Partial<Task>,
    authToken: string
  ) => Promise<void>;
  deleteTask: (id: string, authToken: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  task: {} as Task,
  loadingTask: true,
  loadingTasksCalendar: true,
  calendarTasks: [],
  fetchTasks: async (date, authToken) => {
    try {
      const response = await api.get(`tasks?date=${date.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({ tasks: response.data.data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchCalendarTasks: async (date, authToken) => {
    try {
      set({ loadingTasksCalendar: true });
      const response = await api.get(`tasks?date=${date.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({ calendarTasks: response.data.data });
      set({ loadingTasksCalendar: false });
    } catch (error) {
      console.error(error);
    }
  },
  fetchTask: async (id: string) => {
    try {
      const response = await api.get(`tasks/${id}`);
      set({ task: response.data.data });
      set({ loadingTask: false });
    } catch (error) {
      console.warn(error);
    }
  },
  addTask: async (task, authToken) => {
    try {
      const response = await api.post("tasks", task, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tasksForToday = response.data.data.filter((createdTask: Task) => {
        const taskDate = new Date(createdTask.startDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() == today.getTime();
      });

      set((state) => ({
        tasks: [...state.tasks, ...tasksForToday],
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateTask: async (id, updatedTask, authToken) => {
    try {
      await api.patch(`tasks/${id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id == id ? { ...task, ...updatedTask } : task
        ),
      }));

      set((state) => ({
        task: state.tasks.find((task) => task._id == id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteTask: async (id, authToken) => {
    try {
      await api.delete(`tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id != id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
