import { useState } from 'react';
import api from '@/api/api'; 
import TipCategory  from '@/interfaces/TipCategory'; 

export const useTipCategories = () => {
  const [tipCategories, setTipCategories] = useState<TipCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

   const fetchTipCategories = async () => {
      try {
        const response = await api.get("tipCategory");                
        const categories = response.data.data; 
        const allCategory = { name: 'All', _id: 'All' };
        setTipCategories([allCategory, ...categories]);        
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error fetching tips');
      } finally {
        setLoading(false);
      }
    };

  return { fetchTipCategories, tipCategories, loading, error };
};
