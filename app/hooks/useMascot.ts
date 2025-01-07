import { useState, useEffect } from 'react';
import { getMascot } from '@/api/mascots';
import  Mascot  from '@/interfaces/Mascot'; 

export const useMascot = (mascotId: string | undefined) => {
  const [mascot, setMascot] = useState<Mascot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    const fetchMascots = async () => {
      if (!mascotId) {
        setError('Mascot ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await getMascot(mascotId);
        //console.log('response use mascots:', response.data)
        setMascot(response.data);
        
      } catch (err) {
        console.error('Error fetching tips:', err);
        setError('Error fetching tips');
      } finally {
        setLoading(false);
      }
    };

    fetchMascots();
  }, [mascotId]);

  return { mascot, loading, error };
};
