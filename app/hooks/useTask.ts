import { useEffect, useState } from "react";
import users from "@/api/api";
import { useUserInfo } from "./useUserInfo";

export function useTask() {
  const { userInfo, loading } = useUserInfo();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleGetTasks = async (date: Date, authToken: string) => {
    try {
      const response = await users.get(`tasks?date=${date.toISOString()}`, {
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
      const response = await users.get(`tasks/categories`);
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
      await users.patch(`tasks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { tasks, setTasks, loading, getTasks, editTask, categories };
}
