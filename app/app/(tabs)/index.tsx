import React, { useEffect, useState } from "react";
import { Text, View, Vibration, Platform, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { useUserInfo } from "@/hooks/useUserInfo";
import useFonts from "@/hooks/useFonts";
import { useTask } from "@/hooks/useTask";
import { useBill } from "@/hooks/useBill";
import Filter from "@/components/Filter";
import HeaderHomeScreen from "@/components/HeaderHomeScreen";
import CardsHome from "@/components/CardsHome";
import ListHome from "@/components/ListHome";
import { groupTasksByTime, categorizeTasks } from "@/utils/taskUtils";
import Task from "@/interfaces/Task";
import Bill from "@/interfaces/Bill";
import NoTasksView from "@/components/NoTasksView";
import StuffHeader from "@/components/StuffHeader";

export default function HomeScreen() {
  const today = new Date();
  const { user, loading } = useUser();
  const { logged } = useUserInfo();
  const fontsLoaded = useFonts();
  const [showFilter, setShowFilter] = useState(false);
  const [filterSelection, setFilterSelection] = useState({
    category: "all",
    filter: "all",
    group: "all",
    layout: "cards",
    sortBy: "ascending",
  });
  const { getTasks, tasks, editTask, categories, deleteTask } = useTask();
  const { getBills, bills, editBill, deleteBill } = useBill();
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [showList, setShowList] = useState(false);

  const getMascotStyle = (mascot: string) => {
    console.log(mascot);
    
    switch (mascot) {
      case "Lady Mess":
        return {
          backgroundColor: "#8B9FE8",
        };
      case "Miss Perfect":
        return {
          backgroundColor: "#FBD160",
        };
      case "Mr. Lazy":
        return {
          backgroundColor: "#12BA5B",
        };
      default:
        return {
          backgroundColor: "#000000",
        };
    }
  };

  useEffect(() => {
    if (logged === false) {
      router.push("/register");
    }
  }, [logged]);

  useEffect(() => {
    if (loading === false && logged === true) {
      getTasks(today);
      getBills(today);
      setLoadingTasks(false);
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

  if (loading || !fontsLoaded || loadingTasks || !loaded)
    return <Text>Loading...</Text>;

  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [1 * ONE_SECOND_IN_MS];

  const changeStatus = async (data: Task | Bill, name: string) => {
    try {
      const updatedStatus = !data.status;
      if (name === "task") {
        const updatedStatus = !data.status;
        await editTask(data._id, { status: updatedStatus });
        getTasks(today);
        if (user?.data.vibration && updatedStatus === true) {
          Platform.OS === "android"
            ? Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            : Vibration.vibrate(PATTERN);
        }
      } else {
        await editBill(data._id, { status: updatedStatus });
        getBills(today);
        if (user?.data.vibration && updatedStatus === true) {
          Platform.OS === "android"
            ? Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            : Vibration.vibrate(PATTERN);
        }
      }
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

  const applyFilters = (tasks: Task[], bills: Bill[]) => {
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

  const handleDelete = async (id: string, type: string) => {
    try {
      if (type == "task") {
        await deleteTask(id);
        getTasks(today);
      } else if (type == "bill") {
        await deleteBill(id);
        getBills(today);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { filteredTasks, filteredBills } = applyFilters(
    tasks ?? [],
    bills ?? []
  );
  const categorizedTasks = categorizeTasks(filteredTasks);
  const { allDayTasks, timedTasks } = categorizedTasks;
  const groupedTasks = groupTasksByTime(timedTasks);

  return (
    user && (
      <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: "#F7F6F0", flex: 1 }}>
          <View style={{ marginHorizontal: 20, paddingTop: 10 }}>
            <HeaderHomeScreen
              month={today.toLocaleDateString("en-US", { month: "short" })}
              day={today.getDate()}
              weekday={today.toLocaleDateString("en-US", { weekday: "short" })}
              username={user.data.name}
              tasksToday={tasks?.length}
              billsToday={bills?.length}
              mascotStyle={() => getMascotStyle(user.data.IDmascot.name)}
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
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
}
