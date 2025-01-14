import users from '@/api/api';
import { useUserInfo } from "./useUserInfo";
const { userInfo  } = useUserInfo();

export const markAsFavorite = async (tipId: string) => {
  try {
    console.log('inside mark as favorite hook')
    const response = await users.post(`tips/${tipId}/favorite`, {
      headers: {
        Authorization: `Bearer ${userInfo?.authToken}`,
      },
    });

    console.log('response:', response)
    return response
  }
  catch (error) {
    console.warn(error)
  }
}
