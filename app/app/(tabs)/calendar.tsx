import useFonts from "@/hooks/useFonts";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";
import React from "react";
import NoTasksView from "@/components/NoTasksView";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHome from "@/components/ListHome";
import { groupTasksByTime, categorizeTasks } from "@/utils/taskUtils";
import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";
import { useUser } from "@/hooks/useUser";
import { calculateStatistics } from "@/utils/statisticsUtils";
import { useBillStore } from "@/stores/billStore";
import { useTaskStore } from "@/stores/taskStore";
import LoadingScreen from "@/components/LoadingScreen";
import HeaderItem from "@/components/Header";
import useUserStore from "@/stores/userStore";

const CalendarScreen = () => {
  const { user } = useUser();
  const fontsLoaded = useFonts();
  const { userInfo } = useUserInfo();
  const [showStat, setShowStat] = useState(true);
  const [day, setDay] = useState();
  const { fetchCalendarTasks, calendarTasks, updateTask, loadingTasksCalendar } = useTaskStore();
  const { fetchCalendarBills, updateBill, calendarBills, loadingBillsCalendar } = useBillStore();
  const { streak } = useUserStore();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const categorizedTasks = categorizeTasks(calendarTasks);
  const { allDayTasks, timedTasks } = categorizedTasks;
  const groupedStuff = groupTasksByTime(timedTasks);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(
    today.getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);
  const [perfectDaysCount, setPerfectDaysCount] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [monthlyRate, setMonthlyRate] = useState<number>(0);
  const [overallRate, setOverallRate] = useState<number>(0);
  const [monthTasks, setMonthTasks] = useState<number>(0);
  const [monthBills, setMonthBills] = useState<number>(0);
  const [billsCompleted, setBillsCompleted] = useState<number>(0);
  const [loading, setLoading] = useState(true)
  const width = Dimensions.get("window").width;

  useEffect(() => {
    if (!user) return;

    const {
      perfectDaysCount,
      tasksCompleted,
      billsCompleted,
      monthlyRate,
      highestStreak,
      overallRate,
      monthTasksCount,
      monthBillsCount,
    } = calculateStatistics(
      user.userTasks,
      user.userBills,
      currentMonth,
      currentYear
    );

    setPerfectDaysCount(perfectDaysCount);
    setTasksCompleted(tasksCompleted);
    setBillsCompleted(billsCompleted);
    setMonthlyRate(monthlyRate);
    setOverallRate(overallRate);
    setHighestStreak(highestStreak);
    setMonthTasks(monthTasksCount);
    setMonthBills(monthBillsCount);
    setLoading(false)

  }, [currentMonth, currentYear, user, calendarTasks, calendarBills]);

  const stats = [
    { label: "Total Tasks", value: monthTasks },
    { label: "Total Bills", value: monthBills },
    { label: "Perfect Days", value: perfectDaysCount },
    { label: "Highest Streak", value: highestStreak },
    { label: "Tasks Completed this Month", value: tasksCompleted },
    { label: "Bills Completed this Month", value: billsCompleted },
    { label: "Monthly Rate", value: `${monthlyRate}%` },
    { label: "Overall Rate", value: `${overallRate}%` },
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
      if (userInfo) {
        fetchCalendarTasks(new Date(newSelectedDate), userInfo.authToken);
        fetchCalendarBills(new Date(newSelectedDate), userInfo.authToken);
      }

      setMarkedDates({
        [newSelectedDate]: { selected: true, selectedColor: "#EEEADF" },
      });
    }

    setDay(newSelectedDate);
  };

  if (!fontsLoaded || loading) return <LoadingScreen />;

  const changeStatus = async (data: Task | Bill, name: string) => {
    try {
      const updatedStatus = !data.status;
      if (selectedDay && userInfo) {
        if (name === "task") {
          await updateTask(data._id, { status: updatedStatus }, userInfo.authToken);
          fetchCalendarTasks(new Date(selectedDay), userInfo.authToken);
        } else {
          await updateBill(data._id, { status: updatedStatus }, userInfo.authToken);
          fetchCalendarBills(new Date(selectedDay), userInfo.authToken);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingHorizontal: 20 }}>
          <Text style={{color: '#291752', fontSize: 23.04, fontFamily: 'SF-Pro-Display-Medium'}}>Calendar</Text>
          <HeaderItem page="Calendar" userStreak={streak} />
        </View>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
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
          style={{...styles.statsList, marginBottom: width * 0.2,}}
        />
      ) : (
        <View style={styles.statsList}>
          {loadingTasksCalendar || loadingBillsCalendar ? <LoadingScreen type='calendar'/> :
          calendarTasks.length > 0 || calendarBills.length > 0 ? (
            <ListHome
              allDayTasks={allDayTasks}
              groupedTasks={groupedStuff}
              filteredBills={calendarBills}
              changeStatus={changeStatus}
              user={user}
            />
          ) : (
            <NoTasksView />
          )
        }
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