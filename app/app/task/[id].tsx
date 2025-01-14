import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Vibration
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import useFonts from "@/hooks/useFonts";
import Task from "@/interfaces/Task";
import { useTask } from "@/hooks/useTask";
import { formatDate } from "@/utils/taskUtils";
import { useTaskStore } from "@/stores/taskStore";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useUser } from "@/hooks/useUser";

const TaskDetail = () => {
  const fontsLoaded = useFonts();
  const { id } = useLocalSearchParams();
  const { handleGetTask, task } = useTask();
  const { updateTask, deleteTask } = useTaskStore()
  const { userInfo } = useUserInfo();
  const { user } = useUser();

  useEffect(() => {
    if (typeof id === "string") {
      handleGetTask(id);
    }
  }, [task]);

  if (!task || !fontsLoaded || !userInfo) {
    return (
      <View style={styles.container}>
        <Text>Loading task details...</Text>
      </View>
    );
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          backgroundColor: "#EF444440",
          borderRadius: 6,
          width: 40,
        };
      case "medium":
        return {
          borderRadius: 6,
          backgroundColor: "#FBD16060",
          width: 61,
        };
      case "low":
        return {
          backgroundColor: "#B8DEA480",
          borderRadius: 6,
          width: 38,
        };
      default:
        return {};
    }
  };

  const getCountdown = (startDate: Date): string => {
    const now = new Date();
    const start = new Date(startDate);

    if (start <= now) {
      return "Today";
    }

    const isToday = start.toDateString() === now.toDateString();
    if (isToday) {
      const timeRemaining = start.getTime() - now.getTime();
      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );

      return `${hours}h ${minutes}m`;
    }

    return formatDate(start);
  };

  const formatTime = (dateInput: Date | string): string => {
    const date = new Date(dateInput);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}h${formattedMinutes}`;
  };

  const handleDeleteTask = () => {
    deleteTask(task._id, userInfo.authToken);
    router.push("/");
  };

  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [1 * ONE_SECOND_IN_MS];

  const handleMarkAsDone = async (task: Task) => {
    try {
      let newStatus = !task.status;      
      await updateTask(task._id, { status: newStatus }, userInfo.authToken );
    
      if (user?.data.vibration && newStatus === true) {
        Platform.OS === "android"
          ? Vibration.vibrate(1 * ONE_SECOND_IN_MS)
          : Vibration.vibrate(PATTERN);
      }
    }
     catch (error: any) {
      console.error("Error message:", error);
    }
  };

  return (
    task && (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F6F0" }}>
          <ScrollView style={styles.container}>
            <View style={styles.taskHeader}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 13.33,
                    color: "#474038",
                    fontFamily: "Rebond-Grotesque-Medium",
                    padding: 4,
                    textAlign: "center",
                    lineHeight: 24,
                    ...getPriorityStyle(task.priority),
                  }}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "Rebond-Grotesque-Medium",
                      fontSize: 16,
                      color: "#562CAF",
                      textAlign: "right",
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.taskTitle}>{task.name}</Text>
            </View>
            <Text
                style={{
                  fontSize: 13.33,
                  fontFamily: "Rebond-Grotesque-Medium",
                  padding: 7,
                  lineHeight: 15,
                  borderRadius: 100,
                  marginBottom: 20,
                  textAlign: "center",
                  color: task.IDcategory.color,
                  backgroundColor: task.IDcategory.backgroundColor,
                }}
              >
                {task.IDcategory.name}
              </Text>

            <View style={styles.startInfo}>
              <Text style={styles.countdown}>Starts in</Text>
              <Text style={styles.timeRemaining}>
                {getCountdown(task.startDate)}
              </Text>
              <Text style={styles.startDate}>{formatDate(task.startDate)}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Schedule</Text>
              <Text style={styles.schedule}>
                {task.periodicity.charAt(0).toUpperCase() +
                  task.periodicity.slice(1)}{" "}
                - {formatTime(task.startDate)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notes</Text>
              {task.notes && <Text style={styles.notes}>{task.notes}</Text>}
              {!task.notes && <Text style={styles.notes}>No notes yet!</Text>}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Options</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteTask}
              >
                <Text style={styles.deleteText}>Delete Task</Text>
              </TouchableOpacity>
            </View>

            {!task.status ? (
              <TouchableOpacity
                style={{ ...styles.checkButton, backgroundColor: "#6A60F0" }}
                onPress={() => handleMarkAsDone(task)}
              >
                <Text style={styles.checkText}>Check as done</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ ...styles.checkButton, backgroundColor: "#837D74" }}
                onPress={() => handleMarkAsDone(task)}
              >
                <Text style={styles.checkText}>Uncheck as done</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 20,
    justifyContent: "flex-start",
    textAlign: "left",
  },
  time: {
    fontSize: 16,
    color: "#888",
  },
  taskHeader: {
    marginBottom: 20,
    flex: 1,
  },
  priority: {
    fontSize: 16,
    color: "#FFC107",
    backgroundColor: "#FFF7E0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  taskTitle: {
    fontSize: 33.18,
    fontWeight: "bold",
    color: "#291752",
    fontFamily: "SF-Pro-Display-Medium",
    flexShrink: 1,
  },
  category: {
    fontSize: 16,
    color: "#A64D79",
  },
  startInfo: {
    alignItems: "flex-start",
    marginBottom: 20,
    fontFamily: "Rebond-Grotesque-Medium",
    fontSize: 13.33,
  },
  countdown: {
    fontSize: 18,
    color: "#AA8BD3",
    fontFamily: "Rebond-Grotesque-Medium",
  },
  timeRemaining: {
    fontSize: 27.65,
    color: "#562CAF",
    fontFamily: "SF-Pro-Display-Medium",
  },
  startDate: {
    fontSize: 16,
    color: "#562CAF",
    fontFamily: "Rebond-Grotesque-Medium",
    lineHeight: 24,
  },
  section: {
    marginBottom: 20,
    fontFamily: "Rebond-Grotesque-Medium",
  },
  sectionTitle: {
    fontSize: 19.2,
    color: "#291752",
    marginBottom: 10,
    lineHeight: 24,
    fontFamily: "Rebond-Grotesque-Medium",
  },
  schedule: {
    fontSize: 16,
    color: "#291752",
    lineHeight: 24,
    fontFamily: "Rebond-Grotesque-Medium",
    backgroundColor: "#EEEADF",
    padding: 10,
    borderRadius: 8,
  },
  notes: {
    fontSize: 16,
    color: "#A5A096",
    lineHeight: 24,
    fontFamily: "Rebond-Grotesque-Medium",
    backgroundColor: "#EEEADF",
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#EEEADF",
    padding: 10,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  deleteText: {
    fontSize: 16,
    color: "#D32F2F",
    fontWeight: "bold",
    fontFamily: "Rebond-Grotesque-Medium",
  },
  checkButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  checkText: {
    fontSize: 18,
    color: "#FFF",
    fontFamily: "Rebond-Grotesque-Bold",
  },
});

export default TaskDetail;
