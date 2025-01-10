import { Text, View, TouchableHighlight } from "react-native";
import StreaksItem from "./StreaksItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type HeaderItemProps = {
  page: string;
  userStreak?: {
    date: any;
    streak: number;
  };
};

const HeaderItem = ({ page, userStreak }: HeaderItemProps) => {
  return page == "Home" || page == "Bills" || page == "Calendar" ? (
    userStreak && (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <StreaksItem userStreak={userStreak} />
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 50,
            backgroundColor: "#EEEADF",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Icon name="lightbulb-outline" size={28} color="#562CAF" />
        </View>
      </View>
    )
  ) : page == "Achievements" ? (
    <Icon name="chevron-left" size={28} color="#562CAF" />
  ) : page == "Tip" ? (
    <Icon name="chevron-left" size={28} color="#562CAF" />
  ) : page == "Tips" ? (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Icon name="chevron-left" size={28} color="#562CAF" />
      <Icon name="heart" size={28} color="#562CAF" />
    </View>
  ) : (
    page == "Bill" ||
    (page == "Task" && (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Icon name="chevron-left" size={28} color="#562CAF" />
        <TouchableHighlight>
          <Text>Done</Text>
        </TouchableHighlight>
      </View>
    ))
  );
};

export default HeaderItem;
