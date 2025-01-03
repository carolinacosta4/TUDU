import { useEffect, useState } from "react";
import api from "@/api/api";
import { useUserInfo } from "./useUserInfo";

export function useTask() {
  const { userInfo, loading } = useUserInfo();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState<{ _id: string; name: string; backgroundColor: string; color: string }[]>([]);

  const handleGetTasks = async (date: Date, authToken: string) => {
    try {
      const response = await api.get(`tasks?date=${date.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTasks(response.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleGetTasksCategories = async () => {
    try {
      const response = await api.get(`tasks/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    handleGetTasksCategories();
  }, []);

  const getTasks = async (date: Date) => {
    if (userInfo && userInfo.authToken && !loading) {
      handleGetTasks(date, userInfo.authToken);
    }
  };

  const editTask = async (id: string, data: any) => {
    try {
      await api.patch(`tasks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (data: any) => {
    try {
      await api.post(`tasks`, data, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error) {     
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tasks,
    setTasks,
    loading,
    getTasks,
    editTask,
    categories,
    deleteTask,
    createTask,
  };
}
