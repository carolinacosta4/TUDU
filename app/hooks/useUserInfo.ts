import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<{
    userID: string;
    authToken: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState<boolean | null>(null);

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue) return setUserInfo(JSON.parse(jsonValue)), setLogged(true);
      return setUserInfo(undefined), setLogged(false);
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async (value: { userID: string; authToken: string }) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setUserInfo(undefined);
      setLogged(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    setLoading(false);
  }, []);

  return { userInfo, setUserInfo, storeData, loading, logged, logout };
}
