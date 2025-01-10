import { useState } from "react";
import users from "@/api/api";
import { useUserInfo } from "./useUserInfo";
import Bill from "@/interfaces/Bill";


export function useBill() {
  const { userInfo, loading } = useUserInfo();
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState<Bill>();
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

  const handleDeleteBill = async (id: string) => {
      try {
        const response = await users.delete(`bills/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo?.authToken}`,
          },
        });
      } catch (error: any) {
        console.error("Error message:", error);
      }
    }

    const handleGetBill = async (id: string) => {
        try {
          const response = await users.get(`bills/${id}`);
          setBill(response.data.data);
        } catch (error) {
          console.warn(error);
        }
      };

  return { bills, setBills, loading, getBills, editBill, handleDeleteBill, handleGetBill, bill };
}
