import { useState, useEffect } from 'react';
import { getTip } from '@/api/tips';
import  Tip  from '@/interfaces/Tip'; 

export const useTip = (tipId: string | undefined) => {
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    console.log('useEffect triggered with tipId:', tipId);

    const fetchTips = async () => {
      if (!tipId) {
        setError('Tip ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await getTip(tipId);
        //console.log('API response:', response);
        setTip(response.data); 
      } catch (err) {
        console.error('Error fetching tips:', err);
        setError('Error fetching tips');
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, [tipId]);

  return { tip, loading, error };
};
