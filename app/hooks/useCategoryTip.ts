import { useState, useEffect } from 'react';
import { getCategories } from '@/api/tipsCategory'; 
import TipCategory  from '@/interfaces/TipCategory'; 

export const useTipCategories = () => {
  const [tipCategories, setTipCategories] = useState<TipCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchTipCategories = async () => {
      try {
        const response = await getCategories();
        const categories = response.data; 
        //console.log('Fetched categories:', categories);

        const allCategory = { name: 'All', _id: 'All' };
        setTipCategories([allCategory, ...categories]); 
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error fetching tips');
      } finally {
        setLoading(false);
      }
    };

    fetchTipCategories();
  }, []);

  return { tipCategories, loading, error, selectedCategory, setSelectedCategory };
};
