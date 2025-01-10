import { useEffect, useState } from "react";
import api from "@/api/api";
import { useUserInfo } from "./useUserInfo";
import Task from "@/interfaces/Task";

export function useTask() {
  const { userInfo, loading } = useUserInfo();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string; backgroundColor: string; color: string }[]>([]);

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
