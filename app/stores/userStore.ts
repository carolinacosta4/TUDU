import { create } from "zustand";
import api from "@/api/api";
import User from "../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

interface UserState {
  user: User | undefined;
  streak: { streak: 0; date: 0 | Date };
  fetchUser: (userID: string) => Promise<void>;
  addUser: (user: any) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<any>;
  fetchStreak: (userID: string, authToken: string) => Promise<void>;
  logout: () => void;
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
  updateUserMascot: (
    id: string,
    mascotID: string,
    authToken: string
  ) => Promise<void>;
  deleteUser: (id: string, authToken: string) => Promise<void>;
  sendEmail: (email: string) => Promise<void>;
  resetPassword: (
    id: string,
    password: string,
    confirmPassword: string
  ) => Promise<any>;
  unlockAchievement: (
    id: string,
    achievementId: string,
    authToken: string
  ) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  streak: { streak: 0, date: 0 },
  fetchUser: async (userID) => {
    try {
      const response = await api.get(`users/${userID}`);
      set({ user: response.data });
      return response.data
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
      set({ user: undefined, streak: { streak: 0, date: 0 } });
      const response = await api.post("users/login", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.msg;
    }
  },
  fetchStreak: async (userID: string, authToken: string) => {
    try {
      const response = await api.get(`streaks/${userID}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (response.data.success) {
        const lastDateAccessed = new Date(response.data.data.lastDateAccessed)
          .toISOString()
          .split("T")[0];
        if (
          lastDateAccessed === yesterday.toISOString().split("T")[0] ||
          lastDateAccessed === today.toISOString().split("T")[0]
        ) {
          return set({
            streak: {
              streak: response.data.data.streaks,
              date: new Date(response.data.data.lastDateAccessed),
            },
          });
        } else {
          return set({ streak: { streak: 0, date: 0 } });
        }
      } else {
        return set({ streak: { streak: 0, date: 0 } });
      }
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
  updateUserMascot: async (
    userID: string,
    mascotID: string,
    authToken: string
  ) => {
    try {
      await api.patch(
        `users/${userID}/mascots/${mascotID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const response = await api.get(`users/${userID}`);
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
      await AsyncStorage.clear();
      await Notifications.cancelAllScheduledNotificationsAsync();
      set({
        user: undefined,
        streak: { streak: 0, date: 0 },
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
unlockAchievement: async (id, achievementId, authToken) => {
    try {
      await api.post(
        `users/${id}/achievements/${achievementId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error: any) {
      throw error.response?.data?.msg;
    }
  },
  logout: async () => {
    set({ user: undefined });
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}));

export default useUserStore;
