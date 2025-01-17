import User from "@/interfaces/User";
import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";

const unlockUltimateAchievement = (
  userInfo: any,
  unlockAchievement: any,
  user: User
) => {
  if (userInfo) {
    let found = user.userAchievements.find(
      (a) => a.IDAchievements.name == "Ultimate Caregiver"
    );
    if (!found) {
      if (user.userAchievements.length >= 9) {
        unlockAchievement(
          userInfo.userID,
          "67659cb44ff69edb3f0640dd",
          userInfo.authToken
        );
      }
    }
  }
};

export const analyseAchievement = (
  achievementName: string,
  user: any,
  userInfo: any,
  unlockAchievement: any
) => {
  const today = new Date();

  if (achievementName == "Debt-free hero") {
    let found = user.userAchievements.find(
      (a: any) => a.IDAchievements.name == achievementName
    );
    if (!found) {
      if (user.userBills.length >= 4) {
        if (userInfo) {
          unlockAchievement(
            userInfo.userID,
            "67659cd54ff69edb3f0640e0",
            userInfo.authToken
          );
        }
        unlockUltimateAchievement(userInfo, unlockAchievement, user);
        return;
      }
    }
  } else if (achievementName == "50 tasks challenge") {
    let found = user.userAchievements.find(
      (a: any) => a.IDAchievements.name == achievementName
    );
    if (!found) {
      if (user.userTasks.length >= 50) {
        if (userInfo) {
          unlockAchievement(
            userInfo.userID,
            "67659de54ff69edb3f0640ef",
            userInfo.authToken
          );
        }
        unlockUltimateAchievement(userInfo, unlockAchievement, user);
        return;
      }
    }
  } else if (achievementName == "Happy pet, happy you") {
    let found = user.userAchievements.find(
      (a: any) => a.IDAchievements.name == achievementName
    );

    if (!found) {
      if (userInfo && user.data.IDmascot.name == "Miss Perfect") {
        unlockAchievement(
          userInfo.userID,
          "67659c764ff69edb3f0640d9",
          userInfo.authToken
        );
      }
      unlockUltimateAchievement(userInfo, unlockAchievement, user);
      return;
    }
  } else if (achievementName == "20 daily tasks challenge") {
    let found = user.userAchievements.find(
      (a: any) => a.IDAchievements.name == achievementName
    );
    if (!found) {
      let dailyTasks = user.userTasks.filter(
        (task: Task) => task.periodicity == "daily"
      );
      if (dailyTasks.length >= 20) {
        if (userInfo) {
          unlockAchievement(
            userInfo.userID,
            "67659e024ff69edb3f0640f2",
            userInfo.authToken
          );
        }
        unlockUltimateAchievement(userInfo, unlockAchievement, user);
        return;
      }
    }
  } else if (achievementName == "On time, every time") {
    let found = user.userAchievements.find(
      (a: any) => a.IDAchievements.name == achievementName
    );

    if (!found) {
      let today = new Date();
      let previousTasks = user.userTasks.filter(
        (task: Task) => task.endDate < today
      );
      let previousBills = user.userBills.filter(
        (bill: Bill) => bill.dueDate < today
      );

      if (
        !previousTasks.find((task: Task) => !task.status) &&
        !previousBills.find((bill: Bill) => !bill.status)
      ) {
        if (userInfo) {
          unlockAchievement(
            userInfo.userID,
            "67659d2a4ff69edb3f0640e6",
            userInfo.authToken
          );
        }
        unlockUltimateAchievement(userInfo, unlockAchievement, user);
        return;
      }
    }
  } else if (achievementName == "Clean Sweep") {
    let found = user.userAchievements.find(
      (a: any) => a.IDAchievements.name == achievementName
    );

    if (!found) {
      if (
        !user.userTasks.find((task: Task) => !task.status) &&
        !user.userBills.find((bill: Bill) => !bill.status)
      ) {
        if (userInfo) {
          unlockAchievement(
            userInfo.userID,
            "67659d004ff69edb3f0640e3",
            userInfo.authToken
          );
        }
        unlockUltimateAchievement(userInfo, unlockAchievement, user);
        return;
      }
    }
  } else {
    console.log("other achievement");
  }
};


export const analyseStreaksAchievement = (
    achievementName: string,
    user: any,
    userInfo: any,
    unlockAchievement: any,
    userStreak: any
  ) => {
    if (achievementName == "Streak starter") {
      console.log(userStreak);
  
      let found = user.userAchievements.find(
        (a: any) => a.IDAchievements.name == achievementName
      );
  
      if (!found) {
        //   if (user) {
        //     if (userInfo) {
        //       unlockAchievement(
        //         userInfo.userID,
        //         "67659d704ff69edb3f0640ec",
        //         userInfo.authToken
        //       );
        //     }
        //     unlockUltimateAchievement(userInfo, unlockAchievement, user);
        //     return;
        //   }
        console.log("not found");
      }
    } else {
      console.log("other achievement");
    }
  };
  