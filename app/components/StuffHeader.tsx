import Bill from "@/interfaces/Bill";
import Task from "@/interfaces/Task";
import { getCompletedThingsCount } from "@/utils/taskUtils";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type StuffHeaderProps = {
  filterSelection: {
    category: string;
    filter: string;
    group: string;
    layout: string;
    sortBy: string;
  };
  tasksToday: Task[];
  billsDueToday: Bill[];
  onFilterToggle: () => void;
};

const StuffHeader = ({
  filterSelection,
  tasksToday,
  billsDueToday,
  onFilterToggle,
}: StuffHeaderProps) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View>
        <Text
          style={{
            color: "#291752",
            fontSize: 23.04,
            fontFamily: "Rebond-Grotesque-Bold",
            lineHeight: 24,
          }}
        >
          {filterSelection.group === "tasks"
            ? "Tasks tudu"
            : filterSelection.group === "bills"
            ? "Bills tudu"
            : "Stuff tudu"}
        </Text>
        {(tasksToday.length > 0 || billsDueToday.length > 0) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 2,
                marginTop: 4,
              }}
            >
              <Icon name="check-circle" size={17} color="#562CAF" />
              {filterSelection.group === "tasks" ? (
                <Text
                  style={{
                    color: "#562CAF",
                    fontSize: 13.3,
                    fontFamily: "Rebond-Grotesque-Regular",
                    lineHeight: 24,
                  }}
                >
                  {getCompletedThingsCount(
                    tasksToday,
                    billsDueToday,
                    filterSelection.group
                  )}
                  /{tasksToday.length} tasks done
                </Text>
              ) : filterSelection.group === "bills" ? (
                <Text
                  style={{
                    color: "#562CAF",
                    fontSize: 13.3,
                    fontFamily: "Rebond-Grotesque-Regular",
                    lineHeight: 24,
                  }}
                >
                  {getCompletedThingsCount(
                    tasksToday,
                    billsDueToday,
                    filterSelection.group
                  )}
                  /{billsDueToday.length} bills done
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#562CAF",
                    fontSize: 13.3,
                    fontFamily: "Rebond-Grotesque-Regular",
                    lineHeight: 24,
                  }}
                >
                  {getCompletedThingsCount(
                    tasksToday,
                    billsDueToday,
                    filterSelection.group
                  )}
                  /{tasksToday.length + billsDueToday.length} stuff done
                </Text>
              )}
            </View>
          )}
      </View>
      <TouchableWithoutFeedback onPress={onFilterToggle}>
        <Icon name="dots-horizontal" size={24} color="#562CAF" />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StuffHeader;
