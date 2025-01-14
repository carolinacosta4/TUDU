import { useState, useEffect } from 'react';
import users, { get, post } from '@/api/api'; 
import Tip from '@/interfaces/Tip';
import { useUserInfo } from "./useUserInfo";
const { userInfo  } = useUserInfo();

export const useTip = (tipId: string) => {
  const { loading  } = useUserInfo();
  const [tip, setTip] = useState<Tip[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await get("http://192.168.137.1:3000", `tips/${tipId}`, "");
        setTip(response.data);
      } catch (err) {
        setError('Error fetching tips');
      } 
    };
    fetchTip();
  }, [])

  return { tip, loading, error};
};

