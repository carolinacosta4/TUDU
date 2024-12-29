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
    IDmascot: string;
    onboardingSeen: boolean;
  };
  userTasks: Task[];
  userBills: Bill[];
}
