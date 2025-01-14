import { useState, useEffect } from 'react';
import users, { get, post } from '@/api/users';
import Tip from '@/interfaces/Tip';
import { useUserInfo } from "./useUserInfo";

export const useTip = () => {
  const { loading } = useUserInfo();
  const [tip, setTip] = useState<Tip[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTip = async (tipId: string) => {
    try {
      const response = await users.get(`tips/${tipId}`);
      setTip(response.data);
      console.log(response.data);
    } catch (err) {
      setError('Error fetching tips');
    }
  };

const removeFromFavorite = async (tipId: string, authToken: string) => {
  try {
    const response = await users.delete(`tips/${tipId}/favorite`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('response:', response);
  } catch (error) {
    console.warn(error);
  }
};

const markAsFavorite = async (tipId: string, authToken: string) => {
  try {
    console.log('inside mark as favorite hook');
    const response = await users.post(`tips/${tipId}/favorite`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log('response:', response);
    return response;
  } catch (error) {
    console.warn(error);
  }
};

  return { tip, loading, error, markAsFavorite, removeFromFavorite, fetchTip };
}; 
