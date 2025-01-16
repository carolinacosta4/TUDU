import axios from "axios";

export interface UserDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default axios.create({
  baseURL: "http://172.23.113.133:3000",  //uni
  // baseURL: "http://192.168.1.231:3000", 
  headers: {
    "Content-type": "application/json",
  },
});

export async function get(apiBaseUrl: string, endpoint: string, token: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    throw Error;
  }
}

export async function post(
  apiBaseUrl: string,
  endpoint: string,
  data: UserDetails,
  token: string
) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
}

export async function patch(
  apiBaseUrl: string,
  endpoint: string,
  data: any,
  token: string
) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `API request failed with status ${response.status}: ${errorMessage}`
    );
  }
  const data = await response.json();
  return data;
}
