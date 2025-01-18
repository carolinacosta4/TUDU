import { Text, View, TouchableOpacity } from "react-native";
import StreaksItem from "./StreaksItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link, router } from "expo-router";

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
          <Link href={{ pathname: "/tips" }}>
            <Icon name="lightbulb-outline" size={28} color="#562CAF" />
          </Link>
        </View>
      </View>
    )
  ) : page == "Achievements" || page == "Favorites" || page == "Bill" || page == "Task" ? (
    <TouchableOpacity onPress={() => router.back()}>
      <Icon name="chevron-left" size={28} color="#562CAF" />
    </TouchableOpacity>
  ) : page == "Tip" ? (
    <TouchableOpacity onPress={() => router.back()} style={{ padding: 20, paddingTop: 50 }}>
      <Icon name="chevron-left" size={28} color="#EEE5F5" />
    </TouchableOpacity>
  ) : page == "Tips" && (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="chevron-left" size={28} color="#562CAF" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 23.04,
            color: "#562CAF",
            fontFamily: "SF-Pro-Display-Medium",
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          Tips
        </Text>
      </View>
      <Link href={{ pathname: "/favorites" }}>
        <Icon name="heart" size={28} color="#562CAF" />
      </Link>
    </View>
  )
};

export default HeaderItem;
