import { create } from "zustand";
import api from "@/api/api";
import Achievement from "../interfaces/Achievement";

interface AchievementState {
  achievements: Achievement[];
  fetchAchievements: () => Promise<void>;
  
}

export const useAchievementsStore = create<AchievementState>((set) => ({
  achievements: [],
  fetchAchievements: async () => {
    try {
      const response = await api.get(`achievements`);
      set({ achievements: response.data.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAchievementsStore;
