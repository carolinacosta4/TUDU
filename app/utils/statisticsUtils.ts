import Bill from "@/interfaces/Bill";
import Task from "../interfaces/Task";

export const calculateStatistics = (
  userTasks: Task[],
  userBills: Bill[],
  currentMonth: number,
  currentYear: number
) => {
  const monthTasks = userTasks.filter((t) => {
    const taskDate = new Date(t.startDate);
    const taskMonth = taskDate.getMonth();
    const taskYear = taskDate.getFullYear();
    const previousMonth = currentMonth == 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth == 0 ? currentYear - 1 : currentYear;
    return taskMonth == previousMonth && taskYear == previousMonthYear;
  });

  const monthBills = userBills.filter((bill) => {
    const billDate = new Date(bill.dueDate);
    const billMonth = billDate.getMonth();
    const billYear = billDate.getFullYear();
    const previousMonth = currentMonth == 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth == 0 ? currentYear - 1 : currentYear;
    return billMonth == previousMonth && billYear == previousMonthYear;
  });

  const monthStuff = [...monthTasks, ...monthBills];

  if (monthStuff.length > 0) {
    const groupedStuff: [
      string,
      { stuff: (Task | Bill)[]; allDone: boolean; streak: boolean }
    ][] = [];
    let done = 0;

    monthTasks.forEach((stuff) => {
      const taskDate = new Date(stuff.startDate).toDateString();
      let group = groupedStuff.find(([date]) => date == taskDate);
      if (!group) {
        group = [taskDate, { stuff: [], allDone: true, streak: false }];
        groupedStuff.push(group);
      }
      group[1].stuff.push(stuff);

      if (stuff.status) {
        done += 1;
      } else {
        group[1].allDone = false;
      }

      group[1].streak = group[1].allDone;
    });

    const perfectDays = [];
    let currentStreak = 0;
    let highestStreak = 0;
    if (groupedStuff.length > 0) {
      groupedStuff.forEach(([date, tasks]) => {
        if (tasks.allDone) {
          perfectDays.push(date);
        }
      });

      groupedStuff.forEach(([_, { allDone }]) => {
        if (allDone) {
          currentStreak++;
          if (currentStreak > highestStreak) {
            highestStreak = currentStreak;
          }
        } else {
          currentStreak = 0;
        }
      });
    }

    if (done == 0) {
      highestStreak = 0;
    }

    const perfectDaysCount = perfectDays.length;
    const tasksCompleted = monthTasks.filter((t) => t.status).length;
    const billsCompleted = monthBills.filter((b) => b.status).length;
    const monthlyRate = Math.floor(
      (monthStuff.filter((t) => t.status).length / monthStuff.length) * 100
    );
    const overallRate = Math.floor(
      (monthStuff.filter((t) => t.status).length / monthStuff.length) * 100
    );
    const monthTasksCount = monthTasks.length;
    const monthBillsCount = monthBills.length;

    return {
      perfectDaysCount,
      tasksCompleted,
      billsCompleted,
      monthlyRate,
      highestStreak,
      overallRate,
      monthTasksCount,
      monthBillsCount,
    };
  } else {
    return {
      perfectDaysCount: 0,
      tasksCompleted: 0,
      billsCompleted: 0,
      monthlyRate: 0,
      highestStreak: 0,
      overallRate: 0,
      monthTasksCount: 0,
      monthBillsCount: 0,
    };
  }
};
