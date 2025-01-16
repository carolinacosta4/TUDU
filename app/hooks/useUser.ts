import { useEffect, useState } from "react";
import api from "@/api/api";
import User from "@/interfaces/User";
import { useUserInfo } from "./useUserInfo";

export function useUser() {
  const { userInfo, loading } = useUserInfo();
  const [user, setUser] = useState<User>();
  const [userStreak, setUserStreak] = useState<any>();

  const handleGetUser = async (userID: string) => {
    try {
      const response = await api.get(`users/${userID}`);
      setUser(response.data);      
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetStreak = async (userID: string) => {
    try {
      const response = await api.get(`streaks/${userID}`, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
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
          return setUserStreak({
            streak: response.data.data.streaks,
            date: new Date(response.data.data.lastDateAccessed),
          });
        } else {
          return setUserStreak({ streak: 0, date: 0 });
        }
      } else {
        return setUserStreak({ streak: 0, date: 0 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserStreak = async (userID: string) => {
    try {
      await api.patch(
        `streaks/${userID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo?.authToken}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const editUserMascot = async (userID: string, mascotID: string) => {
    try {     
      await api.patch(`users/${userID}/mascots/${mascotID}`, {}, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfo && !loading) {
      handleGetUser(userInfo.userID);
      handleGetStreak(userInfo.userID);
    }
  }, [userInfo, loading]);

  return {
    user,
    setUser,
    loading,
    editUserMascot,
    handleGetUser,
    userStreak,
    handleUserStreak,
    handleGetStreak,
  };
}