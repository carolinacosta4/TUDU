import { useState, useEffect } from 'react';
import api from '@/api/api';
import Tip from '@/interfaces/Tip';
import { useUserInfo } from "./useUserInfo";

export const useTip = () => {
  const { loading } = useUserInfo();
  const [tip, setTip] = useState<Tip>();
  const [error, setError] = useState<string | null>(null);

  const fetchTip = async (tipId: string) => {
    try {
      const response = await api.get(`tips/${tipId}`);
      setTip(response.data.data);
    } catch (err) {
      setError('Error fetching tips');
    }
  };

const removeFromFavorite = async (tipId: string, authToken: string) => {
  try {
    await api.delete(`tips/${tipId}/favorite`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    console.warn(error);
  }
};

const markAsFavorite = async (tipId: string, authToken: string) => {
  try {   
    const response = await api.post(`tips/${tipId}/favorite`, {}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response;
  } catch (error) {   
    console.warn(error);
  }
};

  return { tip, loading, error, markAsFavorite, removeFromFavorite, fetchTip };
}; 
