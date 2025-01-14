import { useState, useEffect } from 'react';
import { get } from '@/api/api'; 
import Tip from '@/interfaces/Tip';

export const useTips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await get("http://192.168.137.1:3000", "tips", "");
        setTips(response.data);
      } catch (err) {
        setError('Error fetching tips');
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  return { tips, loading, error };
};
