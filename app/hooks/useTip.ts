import { useState, useEffect } from 'react';
import { getTip } from '@/api/tips';
import { Tip } from '@/types/tips'; 

export const useTip = (tipId: string | undefined) => {
  const [tip, setTip] = useState<Tip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      if (!tipId) {
        setError('Tip ID is missing');
        setLoading(false);
        return;
      }
  
      try {
        const response = await getTip(tipId);
        console.log('response:', response);
        // setTip(response.data);
      } catch (err) {
        setError('Error fetching tips');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTips();
  }, [tipId]);  

  return { tip, loading, error };
};