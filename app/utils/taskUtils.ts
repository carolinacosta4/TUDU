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
    const duration = end.getTime() - start.getTime();
    const isAllDay =
      duration >= 24 * 60 * 60 * 1000 ||
      (start.getHours() === 0 &&
        start.getMinutes() === 0 &&
        end.getHours() === 23 &&
        end.getMinutes() === 59);

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
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (minutes === 60 || (minutes === 0 && hours === 1)) {
    return `${hours + 1}h`;
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const applyFilters = (
  tasks: Task[],
  bills: Bill[],
  filterSelection: any
) => {
  let filteredTasks = [...tasks];
  let filteredBills = [...bills];

  if (filterSelection.category != "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.IDcategory === filterSelection.category
    );
    filteredBills = [];
  }

  if (filterSelection.group != "all") {
    if (filterSelection.group == "tasks") {
      filteredBills = [];
    } else if (filterSelection.group == "bills") {
      filteredTasks = [];
    }
  }

  if (filterSelection.filter != "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority == filterSelection.filter
    );
    filteredBills = filteredBills.filter(
      (bill) => bill.priority == filterSelection.filter
    );
  }

  if (filterSelection.sortBy == "ascending") {
    filteredTasks.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    filteredBills.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  } else {
    filteredTasks.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
    filteredBills.sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
  }

  return { filteredTasks, filteredBills };
};

export const formatDate = (d: Date | string): string => {
  const date = new Date(d);
  return format(date, 'MMM dd, yyyy');
};