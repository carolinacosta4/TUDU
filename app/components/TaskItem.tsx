import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Task from "@/interfaces/Task";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";

type TaskItemProps = {
  task: Task;
  allDay: boolean;
  changeStatus: (data: Task, name: "task") => void;
  type: string;
  handleDelete: (id: string, type: string) => void;
};

const TaskCardItem = ({
  task,
  allDay,
  changeStatus,
  type,
  handleDelete,
}: TaskItemProps) => {
  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.round(durationInMinutes % 60);
    return `${hours > 0 ? `${hours} hours ` : ""}${minutes} minutes`;
  };

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const derivedDrag = useDerivedValue(() => drag.value + 60);

    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: derivedDrag.value }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <TouchableOpacity
          style={{
            backgroundColor: "#EF4444",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: "100%",
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
          onPress={() => {
            handleDelete(task._id, 'task');
          }}
        >
          <Text
            style={{
              width: 50,
              color: "#F7F6F0",
              textAlign: "center",
              fontFamily: "Rebond-Grotesque-Medium",
              fontSize: 13.3,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </Reanimated.View>
    );
  }

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
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        containerStyle={{
          backgroundColor: "#DDD8CE",
          borderRadius: 16,
        }}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
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
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
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
            }}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TaskCardItem;
