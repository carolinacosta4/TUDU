import { StyleSheet, Text, View } from "react-native";
import { useUser } from "@/hooks/useUser";
import { useUserInfo } from "@/hooks/useUserInfo";
import { router } from "expo-router";
import { useEffect } from "react";
import useFonts from "@/hooks/useFonts";

export default function HomeScreen() {
  const today = new Date();
  const { user, loading } = useUser();
  const { logged } = useUserInfo();
  const month = today.toLocaleDateString("en-US", { month: "short" });
  const day = today.getDate();
  const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
  const fontsLoaded = useFonts();

  useEffect(() => {
    if (logged === false) {
      router.push("/register");
    }
  }, [logged]);

  if (loading && !fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    user && (
      <View style={{ backgroundColor: "#F7F6F0", flex: 1 }}>
        <View style={{ flexDirection: "row", columnGap: 4 }}>
          <Text style={{ ...styles.textGrey, fontSize: 23 }}>
            {month}'{day}
          </Text>
          <Text style={{ color: "#635C54", fontSize: 23 }}>{weekday}</Text>
        </View>
        <Text
          style={{
            ...styles.textPurple,
            fontSize: 27.65,
            fontFamily: "Rebond-Grotesque-Bold",
          }}
        >
          Hello, {user.data.name}!
        </Text>
        <View style={{ flexDirection: "row", columnGap: 4 }}>
          <Text
            style={{
              ...styles.textGrey,
              fontSize: 19.2,
              fontFamily: "Rebond-Grotesque-Medium",
            }}
          >
            You have
          </Text>
          <Text
            style={{
              ...styles.textPurple,
              fontSize: 19.2,
              fontFamily: "Rebond-Grotesque-Medium",
            }}
          >
            {user.userTasks.length}{" "}
            {user.userTasks.length === 1 ? "task" : "tasks"}
          </Text>
          <Text
            style={{
              ...styles.textPurple,
              fontSize: 19.2,
              fontFamily: "Rebond-Grotesque-Medium",
            }}
          >
            and {user.userBills.length}{" "}
            {user.userBills.length === 1 ? "bill" : "bills"}
          </Text>

          <Text
            style={{
              ...styles.textGrey,
              fontSize: 19.2,
              fontFamily: "Rebond-Grotesque-Medium",
            }}
          >
            due today.
          </Text>
        </View>
        <View
          style={{
            marginTop: "50%",
            backgroundColor: "#EEEADF",
            flex: 1,
            padding: 16,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        ></View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  textGrey: {
    color: "#C4BFB5",
  },

  textPurple: {
    color: "#562CAF",
  },
});
