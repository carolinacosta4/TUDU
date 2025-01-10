import axios from "axios";
import TipCategory  from "@/interfaces/TipCategory";

export interface ApiError {
  message: string;
  status: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const apiClient = axios.create({
  baseURL: "http://192.168.137.1:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export async function getCategories(): Promise<ApiResponse<TipCategory[]>> {
  try {
    const response = await apiClient.get<ApiResponse<TipCategory[]>>("/tipCategory");
   // console.log('response:', response);
    //console.log('response.data:', response.data);
    return response.data; 
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
}

export async function getCategoryById(category: { _id: string }): Promise<TipCategory> {
    if (!category._id) {
      throw new Error("Category ID is missing or invalid");
    }
  
    try {
      const response = await apiClient.get<TipCategory>(`/tipCategory/${category._id}`);
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
