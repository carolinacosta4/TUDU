import Achievement from "./Achievement";
import Bill from "./Bill";
import Task from "./Task";

export default interface User {
  data: {
    _id: string;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    cloudinary_id: string;
    notifications: boolean;
    sound: boolean;
    vibration: boolean;
    darkMode: boolean;
    isDeactivated: boolean;
    IDmascot: {
      _id: string;
      name: string;
      image: string;
      description: string;
    };
    onboardingSeen: boolean;
  };
  userTasks: Task[];
  userBills: Bill[];
  userAchievements: {
    _id: string;
    IDAchievements: Achievement;
    IDuser: string;
    unlockedAt: Date;
  }[];
}