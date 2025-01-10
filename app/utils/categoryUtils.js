import { getCategoryById } from '@/api/tipsCategory';

export const fetchCategoryNames = async (tips) => {
  const categoryNameMap = {};
  await Promise.all(
    tips.map(async (tip) => {
      try {
        const category = await getCategoryById({ _id: tip.IDcategory });
        categoryNameMap[tip._id] = category.data;
      } catch (error) {
        console.error(`Error fetching category for tip ${tip._id}:`, error);
      }
    })
  );
  return categoryNameMap;
};
