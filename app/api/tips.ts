import axios from "axios";
import { Tip } from '@/types/tips'; 

export interface ApiError {
  message: string;
  status: number;
}

const apiClient = axios.create({
  baseURL: "http://192.168.0.14:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export async function getTips(): Promise<Tip[]> {
  try {
    const response = await apiClient.get<Tip[]>("/tips");
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

export async function getTip(id: string): Promise<Tip> {
  try {
    const response = await apiClient.get<Tip>(`/tips/${id}`);
    console.log('response from api:', response);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

function handleApiError(error: any): never {
  if (error.response) {
    const apiError: ApiError = {
      message: error.response.data?.message || "An error occurred",
      status: error.response.status,
    };
    console.error(`API Error: ${apiError.message} (Status: ${apiError.status})`);
    throw new Error(apiError.message);
  } else if (error.request) {
    console.error("No response received from the server");
    throw new Error("No response received from the server");
  } else {
    console.error(`Unexpected error: ${error.message}`);
    throw new Error(error.message);
  }
}
