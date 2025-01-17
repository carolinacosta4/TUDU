import { create } from "zustand";
import api from "@/api/api";
import User from "../interfaces/User";

interface UserState {
  user: User;
  fetchUser: (userID: string) => Promise<void>;
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
}));

export default useUserStore;
