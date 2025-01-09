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
import { Calendar, CalendarList } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTask } from "@/hooks/useTask";
import ListHome from "@/components/ListHome";
import { groupTasksByTime, categorizeTasks } from "@/utils/taskUtils";
import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";
import { useUser } from "@/hooks/useUser";

const CalendarScreen = () => {
  const { user } = useUser();
  const fontsLoaded = useFonts();
  const { logged } = useUserInfo();
  const [showStat, setShowStat] = useState(true);
  const [day, setDay] = useState();
  const { getTasks, tasks, editTask, categories } = useTask();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const categorizedTasks = categorizeTasks(tasks);
  const { allDayTasks, timedTasks } = categorizedTasks;
  const groupedTasks = groupTasksByTime(timedTasks);

  useEffect(() => {
    if (logged === false) {
      router.push("/register");
    }
  }, [logged]);

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
    const selectedDate = day.dateString;

    if (selectedDay === selectedDate) {
      setShowStat(!showStat);
    } else {
      setSelectedDay(selectedDate);
      setShowStat(false);
      getTasks(new Date(selectedDate));
    }

    setDay(selectedDate);
  };

  if (!fontsLoaded) return <Text>Loading...</Text>;

  const changeStatus = async (data: Task | Bill, name: string) => {
    try {
      const updatedStatus = !data.status;
      if (name === "task" && selectedDay) {
        await editTask(data._id, { status: updatedStatus });
        getTasks(new Date(selectedDay));
      } else {
        // await editBill(data._id, { status: updatedStatus });
        // getBills(today);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Calendar
        style={styles.calendar}
        markedDates={{
          "2024-11-01": { marked: true, dotColor: "#FFC107" },
          "2024-11-05": { marked: true, dotColor: "#03A9F4" },
          "2024-11-17": { marked: true, dotColor: "#4CAF50" },
        }}
        theme={{
          backgroundColor: "#F7F6F0",
          calendarBackground: "#ffffff",
          todayTextColor: "#6A60F0",
          dayTextColor: "#474038",
          textDisabledColor: "#D9E1E8",
          monthTextColor: "#291752",
        }}
        onDayPress={handleDayPress}
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
            filteredBills={[]}
            changeStatus={changeStatus}
            user={user}
          />) : (
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
