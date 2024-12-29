import { useEffect, useState } from "react";
import users from "@/api/users";
import User from "@/interfaces/User";
import { useUserInfo } from "./useUserInfo";

export function useUser() {
  const { userInfo, loading } = useUserInfo();
  const [user, setUser] = useState<User>();

  const handleGetUser = async (userID: string) => {
    try {
      const response = await users.get(`users/${userID}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfo && !loading) {
      handleGetUser(userInfo.userID);
    }
  }, [userInfo, loading]);

  return { user, setUser, loading };
}
