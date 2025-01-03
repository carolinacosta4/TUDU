import { useState } from "react";
import api from "@/api/api";
import { useUserInfo } from "./useUserInfo";

export function useBill() {
  const { userInfo, loading } = useUserInfo();
  const [bills, setBills] = useState([]);

  const handleGetBills = async (date: Date, authToken: string) => {
    try {
      const response = await api.get(`bills?date=${date.toISOString()}`, {
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
      await api.patch(`bills/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createBill = async (data: any) => {
      try {
        await api.post(`bills`, data, {
          headers: {
            Authorization: `Bearer ${userInfo?.authToken}`,
          },
        });
      } catch (error) {     
        console.log(error);
        
        console.error(error);
      }
    };

  const deleteBill = async (id: string) => {
    try {
      await api.delete(`bills/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { bills, setBills, loading, getBills, editBill, deleteBill, createBill };
}
