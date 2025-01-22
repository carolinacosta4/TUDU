import { create } from "zustand";
import api from "@/api/api";
import Bill from "../interfaces/Bill";

interface BillState {
  bills: Bill[];
  bill: Bill;
  loadingBill: Boolean,
  loadingBillsCalendar: Boolean,
  monthlyBills: Bill[];
  calendarBills: Bill[];
  fetchBills: (date: Date, authToken: string) => Promise<void>;
  fetchMonthBills: (
    month: number,
    year: number,
    authToken: string
  ) => Promise<void>;
  fetchCalendarBills: (date: Date, authToken: string) => Promise<void>;
  fetchBill: (id: string) => Promise<void>;
  addBills: (bill: any, authToken: string) => Promise<void>;
  updateBill: (
    id: string,
    updatedBills: Partial<Bill>,
    authToken: string
  ) => Promise<void>;
  deleteBill: (id: string, authToken: string) => Promise<void>;
}

export const useBillStore = create<BillState>((set) => ({
  bills: [],
  bill: {} as Bill,
  loadingBill: true,
  loadingBillsCalendar: true,
  monthlyBills: [],
  calendarBills: [],
  fetchBills: async (date, authToken) => {
    try {
      const response = await api.get(`bills?date=${date.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({ bills: response.data.data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchMonthBills: async (month, year, authToken) => {
    try {
      const response = await api.get(`bills?month=${month}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({ monthlyBills: response.data.data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchCalendarBills: async (date, authToken) => {
    try {
      set({ loadingBillsCalendar: true });
      const response = await api.get(`bills?date=${date.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({ calendarBills: response.data.data });
      set({ loadingBillsCalendar: false });
    } catch (error) {
      console.error(error);
    }
  },
  fetchBill: async (id: string) => {
      try {
        const response = await api.get(`bills/${id}`);
        set({ bill: response.data.data });
        set({ loadingBill: false });
      } catch (error) {
        console.warn(error);
      }
    },
  addBills: async (bill, authToken) => {
    try {
      const response = await api.post("bills", bill, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const billsForToday = response.data.data.filter((createdBill: Bill) => {
        const billDate = new Date(createdBill.dueDate);
        billDate.setHours(0, 0, 0, 0);
        return billDate.getTime() == today.getTime();
      });

      set((state) => ({
        bills: [...state.bills, ...billsForToday],
      }));

      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const billsForMonth = response.data.data.filter((createdBill: Bill) => {
        const billDate = new Date(createdBill.dueDate);
        return billDate.getMonth() == currentMonth && billDate.getFullYear() == currentYear;
      });

      set((state) => ({
        monthlyBills: [...state.monthlyBills, ...billsForMonth].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateBill: async (id, updatedBills, authToken) => {
    try {
      await api.patch(`bills/${id}`, updatedBills, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set((state) => ({
        bills: state.bills.map((bill) =>
          bill._id == id ? { ...bill, ...updatedBills } : bill
        ),
      }));
      set((state) => ({
        monthlyBills: state.monthlyBills.map((bill) =>
          bill._id == id ? { ...bill, ...updatedBills } : bill
        ),
      }));

      set((state) => ({
        bill: state.bills.find((bill) => bill._id == id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteBill: async (id, authToken) => {
    try {
      await api.delete(`bills/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set((state) => ({
        bills: state.bills.filter((bill) => bill._id != id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
