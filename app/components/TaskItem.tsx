import { Text, TouchableWithoutFeedback, View } from "react-native";
import Task from "@/interfaces/Task";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type TaskItemProps = {
  task: Task;
  allDay: boolean;
  changeStatus: (data: Task, name: "task") => void;
  type: string;
};

const TaskCardItem = ({ task, allDay, changeStatus, type }: TaskItemProps) => {
  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours > 0 ? `${hours} hours ` : ""}${minutes} minutes`;
  };

  const duration = calculateDuration(
    task.startDate.toString(),
    task.endDate.toString()
  );

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

  return type === "cards" ? (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#DDD8CE",
        padding: 10,
        borderRadius: 16,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 13.33,
            color: "#474038",
            fontFamily: "Rebond-Grotesque-Medium",
            padding: 4,
            textAlign: "center",
            ...getPriorityStyle(task.priority),
          }}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#291752",
            fontFamily: "Rebond-Grotesque-Medium",
            marginTop: 6,
          }}
        >
          {task.name}
        </Text>
        {!allDay && (
          <Text
            style={{
              fontSize: 13.3,
              color: "#A5A096",
              fontFamily: "Rebond-Grotesque-Regular",
            }}
          >
            {duration}
          </Text>
        )}
      </View>
      {task.status ? (
        <TouchableWithoutFeedback
          onPress={() => {
            changeStatus(task, "task");
          }}
        >
          <Icon name="check-circle" size={20} color="#562CAF" />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            changeStatus(task, "task");
          }}
        >
          <Icon name="circle-outline" size={20} color="#562CAF" />
        </TouchableWithoutFeedback>
      )}
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        rowGap: 16,
      }}
    >
      {task.status ? (
        <TouchableWithoutFeedback
          onPress={() => {
            changeStatus(task, "task");
          }}
        >
          <Icon name="check-circle" size={25} color="#562CAF" />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            changeStatus(task, "task");
          }}
        >
          <Icon name="circle-outline" size={25} color="#562CAF" />
        </TouchableWithoutFeedback>
      )}

      <Text
        style={{
          fontSize: 16,
          color: "#291752",
          fontFamily: "Rebond-Grotesque-Medium",
          marginTop: 6,
        }}
      >
        {task.name}
      </Text>
      <View
        style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
      >
        <Text
          style={{
            fontSize: 13.33,
            color: "#474038",
            fontFamily: "Rebond-Grotesque-Medium",
            padding: 4,
            textAlign: "center",
            ...getPriorityStyle(task.priority),
          }}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Text>
      </View>
    </View>
  );
};

export default TaskCardItem;
