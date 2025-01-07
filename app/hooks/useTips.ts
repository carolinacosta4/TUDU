import { useState, useEffect } from 'react';
import { getTips } from '@/api/tips';
import  Tip  from '@/interfaces/Tip'; 

export const useTips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await getTips();
        //console.log('response get tips:', response);
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