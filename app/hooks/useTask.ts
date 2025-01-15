import { useEffect, useState } from "react";
import users from "@/api/api";
import { useUserInfo } from "./useUserInfo";
import Task from "@/interfaces/Task";
import Category from "@/interfaces/Category";

export function useTask() {
  const { userInfo, loading } = useUserInfo();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState<Task>();
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

  const handleGetTask = async (id: string) => {
    try {
      const response = await users.get(`tasks/${id}`);
      setTask(response.data.data);
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

  

  const getCategoryById = (categoryId: string) => {
    return categories.find((category: Category) => category._id === categoryId);
  };

  const getTaskCategory = (task: Task) => {
    if (!task || !task.IDcategory) return null;
    return getCategoryById(task.IDcategory);
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

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await users.delete(`tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error: any) {
      console.error("Error message:", error);
    }
  }

  return { tasks, setTasks, loading, getTasks, editTask, categories, getTaskCategory, getCategoryById, handleGetTask, task, handleDeleteTask };
}
