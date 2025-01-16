import { Text, TouchableWithoutFeedback, View } from "react-native";
import Task from "@/interfaces/Task";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

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
    const minutes = Math.round(durationInMinutes % 60);
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
        };
      case "medium":
        return {
          backgroundColor: "#FBD16060",
        };
      case "low":
        return {
          backgroundColor: "#B8DEA480",
        };
      default:
        return {};
    }
  };

  return type === "cards" ? (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        backgroundColor: "#DDD8CE",
        borderRadius: 16,
      }}
    >
      <Link
        href={{
          pathname: "/task/[id]",
          params: { id: task._id, task: JSON.stringify(task) },
        }}
      >
        <View
          style={{
            width: "90%",
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: 6,
              borderRadius: 6,
              ...getPriorityStyle(task.priority),
            }}
          >
            <Text
              style={{
                fontSize: 13.33,
                color: "#474038",
                fontFamily: "Rebond-Grotesque-Medium",
                padding: 4,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: "#291752",
              fontFamily: "Rebond-Grotesque-Medium",
              marginTop: 6,
              lineHeight: 20,
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
                lineHeight: 20,
              }}
            >
              {duration}
            </Text>
          )}
        </View>
      </Link>
      {task.status ? (
        <TouchableWithoutFeedback
          onPress={() => {
            changeStatus(task, "task");
          }}
        >
          <Icon name="check-circle" size={24} color="#562CAF" />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            changeStatus(task, "task");
          }}
        >
          <Icon name="circle-outline" size={24} color="#562CAF" />
        </TouchableWithoutFeedback>
      )}
    </View>
  ) : (
    <Link href={{ pathname: "/task/[id]", params: { id: task._id } }}>
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
            lineHeight: 20,
          }}
        >
          {task.name}
        </Text>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: 6,
              borderRadius: 6,
              ...getPriorityStyle(task.priority),
            }}
          >
            <Text
              style={{
                fontSize: 13.33,
                color: "#474038",
                fontFamily: "Rebond-Grotesque-Medium",
                padding: 4,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
};

export default TaskCardItem;
