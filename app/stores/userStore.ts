import { create } from "zustand";
import api from "@/api/api";
import User from "../interfaces/User";

interface UserState {
  user: User;
  fetchUser: (userID: string) => Promise<void>;
  addUser: (user: any) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<any>;
  updateUser: (
    id: string,
    updatedUser: any,
    authToken: string
  ) => Promise<void>;
  updateUserProfilePicture: (
    id: string,
    formData: FormData,
    authToken: string
  ) => Promise<void>;
  deleteUser: (id: string, authToken: string) => Promise<void>;
  sendEmail: (email: string) => Promise<void>;
  resetPassword: (
    id: string,
    password: string,
    confirmPassword: string
  ) => Promise<any>;
}

export const useUserStore = create<UserState>((set) => ({
  user: {} as User,
  fetchUser: async (userID) => {
    try {
      const response = await api.get(`users/${userID}`);
      set({ user: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  addUser: async (user) => {
    try {
      await api.post("users", user);
    } catch (error: any) {
      throw error.response?.data?.msg;
    }
  },
  loginUser: async (email, password) => {
    try {
      const response = await api.post("users/login", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.msg;
    }
  },
  updateUser: async (id, updatedUser, authToken) => {
    try {
      await api.patch(`users/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const response = await api.get(`users/${id}`);
      set({ user: response.data });
    } catch (error: any) {
      throw error.response?.data?.msg;
    }
  },
  updateUserProfilePicture: async (id, formData, authToken) => {
    try {
      await api.patch(`users/${id}/change-profile-picture`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await api.get(`users/${id}`);
      set({ user: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  deleteUser: async (id, authToken) => {
    try {
      await api.delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  sendEmail: async (email) => {
    try {
      await api.post("users/password-recovery", {
        email: email,
      });
    } catch (error) {
      console.error(error);
    }
  },
  resetPassword: async (id, password, confirmPassword) => {
    try {
      const response = await api.post(`users/reset-password/${id}`, {
        password: password,
        confirmPassword: confirmPassword,
      });

      return response.data;
    } catch (error: any) {
      throw error.response?.data?.msg;
    }
  },
}));

export default useUserStore;
