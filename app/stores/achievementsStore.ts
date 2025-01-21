import { create } from "zustand";
import api from "@/api/api";
import Achievement from "../interfaces/Achievement";

interface AchievementState {
  achievements: Achievement[];
  fetchAchievements: () => Promise<void>;
  unlockAchievement: (
    achievementId: string,
    authToken: string,
    userId: string
  ) => Promise<void>;
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

  unlockAchievement: async (userId, achievementId, authToken) => {
    try {
      await api.post(
        `users/${userId}/achievements/${achievementId}`,
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
}));

export default useAchievementsStore;
