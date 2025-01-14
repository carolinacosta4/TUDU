import users from '@/api/api';
import { useUserInfo } from "./useUserInfo";
const { userInfo  } = useUserInfo();

export const removeFromFavorite = async (tipId: string) => {
    try {
      const response = await users.delete(`tips/${tipId}/favorite`, {
        headers: {
          Authorization: `Bearer ${userInfo?.authToken}`,
        },
      });
      console.log('response:', response)
    }
    catch (error) {
      console.warn(error)
    }
  }
  