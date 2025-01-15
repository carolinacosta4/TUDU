import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";
import { format } from 'date-fns';

export const getCompletedThingsCount = (
  tasks: Task[],
  bills: Bill[],
  type: string
) => {
  return type === "all"
    ? (tasks.filter((task) => task.status).length ?? 0) +
        (bills.filter((bill) => bill.status).length ?? 0)
    : type === "tasks"
    ? tasks.filter((task) => task.status).length ?? 0
    : type === "bills"
    ? bills.filter((bill) => bill.status).length ?? 0
    : 0;
};

export const categorizeTasks = (tasks: Task[] = []) => {
  if (tasks.length === 0) {
    return { allDayTasks: [], timedTasks: [] };
  }

  const allDayTasks: Task[] = [];
  const timedTasks: Task[] = [];

  tasks.forEach((task) => {
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    const isAllDay = end.getTime() - start.getTime() >= 24 * 60 * 60 * 1000;

    isAllDay ? allDayTasks.push(task) : timedTasks.push(task);
  });

  return { allDayTasks, timedTasks };
};

export const groupTasksByTime = (tasks: Task[] = []) => {
  if (tasks.length === 0) {
    return [];
  }

  const groups: { time: string; tasks: Task[] }[] = [];

  tasks.forEach((task) => {
    const time = formatTime(task.startDate.toString());
    let group = groups.find((g) => g.time == time);

    if (!group) {
      group = { time, tasks: [] };
      groups.push(group);
    }

    group.tasks.push(task);
  });

  return groups;
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (d: Date | string): string => {
  const date = new Date(d);
  return format(date, 'MMM dd, yyyy');
};