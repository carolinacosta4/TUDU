import axios from "axios";

export interface UserDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default axios.create({
  // baseURL: "http://192.168.1.100:3000",
  baseURL: "http://172.23.116.118:3000",
  // baseURL: "http://192.168.1.233:3000", //casa
  //baseURL: "http://192.168.137.1:3000", //uni
  // baseURL: "http://192.168.0.14:3000", //casa victoria
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
