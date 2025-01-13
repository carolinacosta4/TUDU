import useFonts from "@/hooks/useFonts";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import React from "react";
import NoTasksView from "@/components/NoTasksView";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTask } from "@/hooks/useTask";
import ListHome from "@/components/ListHome";
import { groupTasksByTime, categorizeTasks } from "@/utils/taskUtils";
import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";
import { useUser } from "@/hooks/useUser";
import { useBill } from "@/hooks/useBill";

const CalendarScreen = () => {
  const { user } = useUser();
  const fontsLoaded = useFonts();
  const { logged } = useUserInfo();
  const [showStat, setShowStat] = useState(true);
  const [day, setDay] = useState();
  const { getTasks, tasks, editTask, categories } = useTask();
  const { getBills, bills, editBill } = useBill();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const categorizedTasks = categorizeTasks(tasks);
  const { allDayTasks, timedTasks } = categorizedTasks;
  const groupedTasks = groupTasksByTime(timedTasks);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [colorDotDays, setColorDotDays] = useState<{ [key: string]: any }>({});

  const getDaysColorDots = (month: number, year: number) => {
    if (!user) {
      console.log("user not found");
      return { green: [], orange: [], purple: [] };
    } else if (!user.userTasks || month === null || year === null) {
      console.log("not working");
      return { green: [], orange: [], purple: [] };
    } else {
      let userTasks = user.userTasks;

      let tasksOfTheMonth = userTasks.filter((t) => {
        let taskDate = new Date(t.startDate);
        let taskMonth = taskDate.getMonth();
        let taskYear = taskDate.getFullYear();
        return taskMonth === month && taskYear === year;
      });

      const groupedByDay = tasksOfTheMonth.reduce((acc: any, task) => {
        let date = new Date(task.startDate).toISOString().split("T")[0]; // Formato: YYYY-MM-DD
        if (!acc[date]){
           acc[date] = [];
          }
        acc[date].push(task);
        return acc;
      }, {});

      const categorizedDays = Object.entries(groupedByDay).reduce(
        (acc, [date, tasks]: [string, Task[]]) => {
          const totalTasks = tasks.length;
          const completedTasks = tasks.filter((t) => t.status).length;
          const completionRate = (completedTasks / totalTasks) * 100;

          if (completionRate === 100) {
            acc.green.push(date);
          } else if (completionRate >= 50) {
            acc.orange.push(date);
          } else {
            acc.purple.push(date);
          }

          return acc;
        },
        { green: [], orange: [], purple: [] }
      );

      console.log("Categorized Days:", categorizedDays);
      return categorizedDays;
    }
  };

  useEffect(() => {
    if (!user){

    }
  })

  useEffect(() => {
    let today = new Date();
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();
    setCurrentMonth(thisMonth);
    setCurrentYear(thisYear);
  
    if (currentMonth && currentYear) {
      const categorizedDays = getDaysColorDots(currentMonth, currentYear);
  
      const colorDotDays = {};
      categorizedDays.green.forEach((date) => {
        colorDotDays[date] = {
          marked: true, selectedColor: 'green'
        };
      });
      categorizedDays.orange.forEach((date) => {
        colorDotDays[date] = {
          marked: true, selectedColor: 'orange'
        };
      });
      categorizedDays.purple.forEach((date) => {
        colorDotDays[date] = {
          marked: true, selectedColor: 'purple'
        };
      });
  
      setColorDotDays(colorDotDays);
      console.log(colorDotDays);
      
    }
  }, [currentMonth, currentYear]);
  

  const stats = [
    { label: "Perfect Days", value: "15 days" },
    { label: "Highest streak", value: "24" },
    { label: "Tasks completed this month", value: "12" },
    { label: "Monthly rate", value: "70%" },
    { label: "Overall rate", value: "30%" },
  ];

  const renderStatItem = ({ item }: any) => (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </View>
  );

  const handleDayPress = (day: any) => {
    const newSelectedDate = day.dateString;

    if (selectedDay === newSelectedDate) {
      setShowStat(!showStat);
      const newMarkedDates = { ...markedDates };
      delete newMarkedDates[selectedDay as string];
      setMarkedDates(newMarkedDates);
      setSelectedDay(null);
    } else {
      setSelectedDay(newSelectedDate);
      setShowStat(false);
      getTasks(new Date(newSelectedDate));
      getBills(new Date(newSelectedDate));

      setMarkedDates({
        [newSelectedDate]: { selected: true, selectedColor: "#EEEADF" },
      });
    }

    setDay(newSelectedDate);
  };

  if (!fontsLoaded) return <Text>Loading...</Text>;

  const changeStatus = async (data: Task | Bill, name: string) => {
    try {
      const updatedStatus = !data.status;
      if (selectedDay) {
        if (name === "task") {
          await editTask(data._id, { status: updatedStatus });
          getTasks(new Date(selectedDay));
        } else {
          await editBill(data._id, { status: updatedStatus });
          getBills(new Date(selectedDay));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={styles.calendar}
        markedDates={{markedDates, colorDotDays}}
        theme={{
          backgroundColor: "#F7F6F0",
          calendarBackground: "#ffffff",
          todayTextColor: "#aa8bd3",
          dayTextColor: "#635C54",
          textDisabledColor: "#D9E1E8",
          monthTextColor: "#291752",
          selectedDayBackgroundColor: "#EEEADF",
          selectedDayTextColor: "#635C54",
        }}
        onDayPress={handleDayPress}
        onMonthChange={(month: any) => {
          setCurrentMonth(month.month);
          setCurrentYear(month.year);
        }}
      />

      {showStat ? (
        <FlatList
          data={stats}
          renderItem={renderStatItem}
          keyExtractor={(item) => item.label}
          style={styles.statsList}
        />
      ) : (
        <View style={styles.statsList}>
          {tasks.length > 0 ? (
            <ListHome
              allDayTasks={allDayTasks}
              groupedTasks={groupedTasks}
              filteredBills={bills}
              changeStatus={changeStatus}
              user={user}
            />
          ) : (
            <NoTasksView />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F6F0" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  iconBadge: { flexDirection: "row", alignItems: "center", marginRight: 10 },
  badgeText: { marginLeft: 5, color: "#474038", fontSize: 16 },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
    marginVertical: 10,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#562CAF20",
    marginHorizontal: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  activeToggle: {
    backgroundColor: "#6A60F0",
    fontFamily: "Rebond-Grotesque-Medium",
    lineHeight: 20,
  },
  toggleText: {
    fontSize: 16,
    color: "#562CAF",
    fontFamily: "Rebond-Grotesque-Medium",
    lineHeight: 20,
  },
  activeText: {
    color: "#FFF",
    fontFamily: "Rebond-Grotesque-Medium",
    lineHeight: 20,
  },
  calendar: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: "Rebond-Grotesque-Medium",
    lineHeight: 20,
  },
  statsList: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  statLabel: {
    fontSize: 16,
    color: "#474038",
    fontFamily: "Rebond-Grotesque-Medium",
    lineHeight: 20,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#291752",
    fontFamily: "Rebond-Grotesque-Medium",
    lineHeight: 20,
  },
});

export default CalendarScreen;
