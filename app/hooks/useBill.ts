import { useState } from "react";
import users from "@/api/api";
import { useUserInfo } from "./useUserInfo";

export function useBill() {
  const { userInfo, loading } = useUserInfo();
  const [bills, setBills] = useState([]);

  const handleGetBills = async (date: Date, authToken: string) => {
    try {
      const response = await users.get(`bills?date=${date.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setBills(response.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  const getBills = async (date: Date) => {
    if (userInfo && userInfo.authToken && !loading) {
      handleGetBills(date, userInfo.authToken);
    }
  };

  const editBill = async (id: string, data: any) => {
    try {
      await users.patch(`bills/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { bills, setBills, loading, getBills, editBill };
}
