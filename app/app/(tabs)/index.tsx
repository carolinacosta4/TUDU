import React, { useEffect, useState } from "react";
import { View, Vibration, Platform, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { useUserInfo } from "@/hooks/useUserInfo";
import useFonts from "@/hooks/useFonts";
import { useTask } from "@/hooks/useTask";
import Filter from "@/components/Filter";
import HeaderHomeScreen from "@/components/HeaderHomeScreen";
import CardsHome from "@/components/CardsHome";
import ListHome from "@/components/ListHome";
import LoadingScreen from "@/components/LoadingScreen";
import {
  groupTasksByTime,
  categorizeTasks,
  applyFilters,
} from "@/utils/taskUtils";
import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";
import NoTasksView from "@/components/NoTasksView";
import StuffHeader from "@/components/StuffHeader";
import { useTaskStore } from "@/stores/taskStore";
import { useBillStore } from "@/stores/billStore";
import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { analyseAchievement, analyseStreaksAchievement } from "@/utils/achievementUtils";
import useUserStore from "@/stores/userStore";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function HomeScreen() {
  const today = new Date();
  const { loading, handleUserStreak } = useUser();
  const { userInfo, logged } = useUserInfo();
  const fontsLoaded = useFonts();
  const [showFilter, setShowFilter] = useState(false);
  const [filterSelection, setFilterSelection] = useState({
    category: "all",
    filter: "all",
    group: "all",
    layout: "cards",
    sortBy: "ascending",
  });
  const { fetchTasks, tasks, updateTask, deleteTask } = useTaskStore();
  const { fetchBills, bills, updateBill, deleteBill } = useBillStore();
  const { categories } = useTask();
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [showList, setShowList] = useState(false);
  const {fetchStreak, streak, updateUserMascot, unlockAchievement, fetchUser, user} = useUserStore()
  	const { showOnboarding } = useOnboarding();

  const getMascotStyle = (mascot: string) => {
    switch (mascot) {
      case "Lady Mess":
        return "#8B9FE8";
      case "Miss Perfect":
        return "#FBD160";
      case "Mr. Lazy":
        return "#12BA5B";
      default:
        return "#000000";
    }
  };

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("You need to enable notifications in settings");
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (logged === false && showOnboarding === 'true') {      
      router.push("/onboarding");
    }else if (logged === false && showOnboarding === 'false') {      
      router.push("/register");
    }else if (logged === true && userInfo) {
      fetchUser(userInfo.userID)
    }
  }, [logged, showOnboarding]);

  useEffect(() => {
    if (loading === false && logged === true && userInfo) {
      fetchTasks(today, userInfo.authToken);
      fetchBills(today, userInfo.authToken);
      setLoadingTasks(false);
      fetchStreak(userInfo.userID, userInfo.authToken);
    }
  }, [logged, loading]);

  useEffect(() => {
    if (!loadingTasks) {
      setLoaded(true);
    }
  }, [loadingTasks]);

  useEffect(() => {
    setShowList(filterSelection.layout === "list");
  }, [filterSelection.layout]);

  const checkAndUpdateMascots = async (tasks: Task[], bills: Bill[]) => {
    const totalItems = tasks.length + bills.length;
    const completedItems =
      tasks.filter((task) => task.status).length +
      bills.filter((bill) => bill.status).length;
    const halfItems = Math.ceil(totalItems / 2);

    if (user) {
      if (completedItems === totalItems) {
        if(userInfo) await updateUserMascot(user.data._id, "676969ada5e78f1378a63a70", userInfo.authToken);
        fetchUser(user.data._id);
      } else if (completedItems >= halfItems) {
        if(userInfo) await updateUserMascot(user.data._id, "67696917a5e78f1378a63a6e", userInfo.authToken);
        fetchUser(user.data._id);
      } else {
        if(userInfo) await updateUserMascot(user.data._id, "676969dfa5e78f1378a63a71", userInfo.authToken);
        fetchUser(user.data._id);
      }
      await analyseAchievement("Happy pet, happy you", user, userInfo, unlockAchievement)
    }
  };

  const checkAndUpdateStreak = async (tasks: Task[], bills: Bill[]) => {
    const totalItems = tasks.length + bills.length;
    const completedItems =
      tasks.filter((task) => task.status).length +
      bills.filter((bill) => bill.status).length;
    const seventyDone = Math.ceil(totalItems * 0.7);

    if (user && completedItems == seventyDone) {
      await handleUserStreak(user.data._id);
      if(userInfo) fetchStreak(user.data._id, userInfo.authToken);
      handleUserStreak(user.data._id);
    }
    await analyseStreaksAchievement(user, userInfo, unlockAchievement, streak)
  };

  const scheduleTaskNotifications = async (tasks: Task[]) => {
    const now = new Date();
    await Notifications.cancelAllScheduledNotificationsAsync();
    for (const task of tasks) {
      if (task.status == false && task.notification == true) {
        const dueDate = new Date(task.startDate);
        const timeUntilNotification = dueDate.getTime() - now.getTime() - 60000;
        if (timeUntilNotification > 0) {          
          const identifier = await Notifications.scheduleNotificationAsync({
            content: {
              title: "TUDU Awaits!",
              body: `🌟 You have an important task: "${task.name}". Don't forget to complete it!`,
              color: "#F7F6F0",
            },
            trigger: {
              type: SchedulableTriggerInputTypes.TIME_INTERVAL,
              seconds: Math.round(timeUntilNotification / 1000),
            },
          });
          console.log(`Notification scheduled for: ${task.name}, to be sent in ${Math.round(timeUntilNotification / 1000)} seconds`);

          setTimeout(async () => {
            await Notifications.cancelScheduledNotificationAsync(identifier);
            console.log(`Notification for task "${task.name}" has been cancelled.`);
          }, timeUntilNotification + 60000);
        }
      }
    }
  };

  useEffect(() => {
    if ((tasks.length > 0 || bills.length > 0) && loaded == true) {
      checkAndUpdateMascots(tasks, bills);
      checkAndUpdateStreak(tasks, bills);
    }
  }, [tasks, bills, loaded]);

  useEffect(() => {
    if (tasks.length > 0 && loaded == true) {
      scheduleTaskNotifications(tasks);
    }
  }, [tasks, loaded]);

  useEffect(() => {
    if (user && userInfo && loaded) {
      analyseAchievement("On time, every time", user, userInfo, unlockAchievement);
    }
  }, [user, userInfo, loaded]);
  
  if (loading || !fontsLoaded || loadingTasks || !loaded || !userInfo || !user || user.data == null)
    return <LoadingScreen/>

  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [1 * ONE_SECOND_IN_MS];

  Notifications.setNotificationHandler({
    handleNotification: async (notification) => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (loading || !fontsLoaded || loadingTasks || !loaded || !userInfo || !user)
    return <LoadingScreen/>
    
  const changeStatus = async (data: Task | Bill, name: string) => {
    try {
      const updatedStatus = !data.status;
      if (name == "task") {
        await updateTask(
          data._id,
          { status: updatedStatus },
          userInfo.authToken
        );
        await fetchTasks(today, userInfo.authToken);
      } else {
        await updateBill(
          data._id,
          { status: updatedStatus },
          userInfo.authToken
        );
        await fetchBills(today, userInfo.authToken);
      }
      if (user?.data.vibration && updatedStatus === true) {
        Platform.OS === "android"
          ? Vibration.vibrate(1 * ONE_SECOND_IN_MS)
          : Vibration.vibrate(PATTERN);
      }
      
      await analyseAchievement("Clean Sweep", user, userInfo, unlockAchievement)
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (selection: {
    category: string;
    filter: string;
    group: string;
    layout: string;
    sortBy: string;
  }) => {
    setFilterSelection(selection);
  };

  const handleDelete = async (id: string, type: string) => {
    try {
      if (type == "task") {
        await deleteTask(id, userInfo.authToken);
        fetchTasks(today, userInfo.authToken);
      } else if (type == "bill") {
        await deleteBill(id, userInfo.authToken);
        fetchBills(today, userInfo.authToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { filteredTasks, filteredBills } = applyFilters(
    tasks ?? [],
    bills ?? [],
    filterSelection
  );
  const categorizedTasks = categorizeTasks(filteredTasks);
  const { allDayTasks, timedTasks } = categorizedTasks;
  const groupedTasks = groupTasksByTime(timedTasks);

  return (
    user && (
      <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: "#F7F6F0", flex: 1 }}>
          <View
            style={{
              marginHorizontal: 20,
              paddingTop: 10,
            }}
          >
            <HeaderHomeScreen
              month={today.toLocaleDateString("en-US", { month: "short" })}
              day={today.getDate()}
              weekday={today.toLocaleDateString("en-US", { weekday: "short" })}
              name={user.data.name}
              tasksToday={tasks?.length}
              billsToday={bills?.length}
              mascotStyle={getMascotStyle(user.data.IDmascot.name)}
              userStreak={streak}
            />
          </View>
          <Image
            source={{ uri: user.data.IDmascot.image }}
            style={{
              height: 151,
              objectFit: "contain",
              marginTop: "10%",
              marginBottom: "-2%",
              zIndex: 10,
            }}
          />
          <View
            style={{
              backgroundColor: "#EEEADF",
              minHeight: "100%",
              padding: 24,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            }}
          >
            <StuffHeader
              filterSelection={filterSelection}
              tasksToday={tasks}
              billsDueToday={bills}
              onFilterToggle={() => setShowFilter(true)}
            />
            <>
              {allDayTasks.length > 0 ||
              filteredBills.length > 0 ||
              groupedTasks.length > 0 ? (
                showList == true ? (
                  <ListHome
                    allDayTasks={allDayTasks}
                    groupedTasks={groupedTasks}
                    filteredBills={filteredBills}
                    changeStatus={changeStatus}
                    user={user}
                  />
                ) : (
                  <CardsHome
                    allDayTasks={allDayTasks}
                    groupedTasks={groupedTasks}
                    filteredBills={filteredBills}
                    changeStatus={changeStatus}
                    user={user}
                    handleDelete={handleDelete}
                  />
                )
              ) : (
                <NoTasksView />
              )}
            </>
          </View>
          {showFilter && (
            <Filter
              onClose={() => setShowFilter(false)}
              visible={true}
              onFilterChange={handleFilterChange}
              categories={categories}
              filterSelection={filterSelection}
              setFilterSelection={setFilterSelection}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
}