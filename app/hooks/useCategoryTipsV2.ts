import { useState, useEffect } from 'react';
import  users  from '@/api/users'; 
import Tip from '@/interfaces/Tip';
import TipCategory from '@/interfaces/TipCategory';

export const useCategories = () => {
    const [category, setCategory] = useState<TipCategory[]>([]);
    const handleGetCategory = async (id: string) => {
        try {
            const response = await users.get(`tipCategory/${id}`)
            console.log('response:', response)
            setCategory(response.data)
        } catch (error) {
            console.warn(error);
        }
    }
    return {category, handleGetCategory}
}