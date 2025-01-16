import { useEffect, useState } from "react";
import api from "@/api/api";
import { useUserInfo } from "./useUserInfo";
import Bill from "@/interfaces/Bill";

export function useBill() {
  const { loading } = useUserInfo();
  const [bills, setBills] = useState<Bill[]>([]);
  const [bill, setBill] = useState<Bill>();
  const [currencies, setCurrencies] = useState<
    { _id: string; name: string; symbol: string }[]
  >([]);
  const { userInfo } = useUserInfo();

  const handleGetBillsCurrencies = async () => {
    try {
      const response = await api.get(`bills/currencies`);
      setCurrencies(response.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    handleGetBillsCurrencies();
  }, []);

  const handleGetBillsForMonth = async (
    month: number,
    year: number,
    authToken: string
  ) => {
    try {
      const response = await api.get(`bills?month=${month}&year=${year}`, {
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

  const handleGetBill = async (id: string) => {
    try {
      const response = await api.get(`bills/${id}`);
      setBill(response.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    bills,
    setBills,
    handleGetBill,
    loading,
    getBillsForMonth,
    bill,
    currencies,
  };
}
