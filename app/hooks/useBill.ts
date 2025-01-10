import { useEffect, useState } from "react";
import api from "@/api/api";
import { useUserInfo } from "./useUserInfo";
import Bill from "@/interfaces/Bill";

export function useBill() {
  const { loading } = useUserInfo();
  const [bills, setBills] = useState<Bill[]>([]);
  const [currencies, setCurrencies] = useState<{ _id: string; name: string; symbol: string }[]>([]);

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


  return {
    bills,
    setBills,
    loading,
    currencies
  };
}
