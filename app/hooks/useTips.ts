import { useState, useEffect } from 'react';
import users from '@/api/users'; 
import Tip from '@/interfaces/Tip';

export const useTips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await users.get("tips");        
        setTips(response.data.data);
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
