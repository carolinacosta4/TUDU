import axios from "axios";
import  Mascot  from '@/interfaces/Mascot'; 

export interface ApiError {
  message: string;
  status: number;
}

const apiClient = axios.create({
  baseURL: "http://172.23.116.206:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export async function getMascots(): Promise<Mascot[]> {
  try {
    const response = await apiClient.get<Mascot[]>("/mascots");
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

export async function getMascot(id: string): Promise<Mascot> {
  try {
    const response = await apiClient.get<Mascot>(`/mascots/${id}`);
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
