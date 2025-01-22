import { useEffect, useState } from "react";
import api from "@/api/api";
import User from "@/interfaces/User";
import { useUserInfo } from "./useUserInfo";

export function useUser() {
  const { userInfo, loading } = useUserInfo();
  const [user, setUser] = useState<User>();
  const handleGetUser = async (userID: string) => {
    try {
      const response = await api.get(`users/${userID}`);
      setUser(response.data);      
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

  useEffect(() => {
    if (userInfo && !loading) {
      handleGetUser(userInfo.userID);
    }
  }, [userInfo, loading]);

  return {
    user,
    setUser,
    loading,
    handleGetUser,
    handleUserStreak,
  };
}