import axios from "axios";
import { Tip } from '@/types/tips'; 

export interface ApiError {
  message: string;
  status: number;
}

const apiClient = axios.create({
  baseURL: "http://172.28.2.174:3000",
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
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

export const markAsFavorite = async (tipId: string, token: string) => {
  try {
    console.log('token', token)
    const response = await apiClient.post(`/tips/${tipId}/favorite`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log('response:', response);
    return response;
  } catch (error) {
    throw error;
  }
};


export async function removeFromFavorite(tipId: string, token: string): Promise<void> {
  try {
    console.log('inside remove from favorite')
    console.log('token', token)
    const response = await apiClient.delete(`/tips/${tipId}/favorite`);
    console.log(response.data.msg);
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
