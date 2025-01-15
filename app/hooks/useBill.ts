import { useState } from "react";
import users from "@/api/api";
import { useUserInfo } from "./useUserInfo";
import Bill from "@/interfaces/Bill";


export function useBill() {
  const { userInfo, loading } = useUserInfo();
  const [bills, setBills] = useState<Bill[]>([]);
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

  const handleGetBillsForMonth = async (month: number, year: number, authToken: string) => {
    try {
      const response = await users.get(`bills?month=${month}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setBills(response.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  const getBillsForMonth = async (month: number, year: number) => {
    if (userInfo && userInfo.authToken && !loading) {
      handleGetBillsForMonth(month, year, userInfo.authToken);
    }
  };

  const editBill = async (id: string, data: any) => {
    try {
      await users.patch(`bills/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });

      setBills((prevBills) =>
        prevBills.map((bill) =>
          bill._id === id ? { ...bill, status: data.status } : bill
        )
      );
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

    return { bills, setBills, getBills, loading, getBillsForMonth, editBill, handleDeleteBill, handleGetBill, bill };
  }