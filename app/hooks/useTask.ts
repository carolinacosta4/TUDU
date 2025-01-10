import { useEffect, useState } from "react";
import api from "@/api/api";
import { useUserInfo } from "./useUserInfo";
import Task from "@/interfaces/Task";
import Category from "@/interfaces/Category";

export function useTask() {
  const { userInfo, loading } = useUserInfo();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>();
  const [categories, setCategories] = useState<{ _id: string; name: string; backgroundColor: string; color: string }[]>([]);

  const handleGetTask = async (id: string) => {
    try {
      const response = await api.get(`tasks/${id}`);
      setTask(response.data.data);
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


  return {
    tasks,
    setTasks,
    loading,
    categories,
  };
}
