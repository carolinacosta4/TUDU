import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type HeaderHomeScreenProps = {
  month: string;
  day: number;
  weekday: string;
  username: string;
  tasksToday: number;
  billsToday: number;
  mascotStyle: string;
};

const HeaderHomeScreen = ({
  month,
  day,
  weekday,
  username,
  tasksToday,
  billsToday,
  mascotStyle,
}: HeaderHomeScreenProps) => {
  return (
    <View style={{ marginRight: 20, paddingTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 2,
        }}
      >
        <View
          style={{
            width: 17,
            height: 17,
            borderRadius: 50,
            backgroundColor: mascotStyle,
          }}
        ></View>
        <Text
          style={{
            color: "#C4BFB5",
            fontSize: 23,
            fontFamily: "SF-Pro-Display-Medium",
          }}
        >
          {month}'{day}
        </Text>
        <Text
          style={{
            color: "#562CAF",
            fontSize: 23,
            fontFamily: "SF-Pro-Display-Medium",
          }}
        >
          {weekday}
        </Text>
      </View>
      <Text
        style={{
          color: "#562CAF",
          fontSize: 27.65,
          fontFamily: "SF-Pro-Display-Bold",
        }}
      >
        Hello, {username}!
      </Text>
      {tasksToday != 0 || billsToday != 0 ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 2,
          }}
        >
          <Text style={styles.textGrey}>You have </Text>
          {tasksToday != 0 && (
            <View style={{ flexDirection: "row", columnGap: 2 }}>
              <Icon name="calendar-blank-outline" size={20} color="#562CAF" />
              <Text style={styles.textPurple}>
                {tasksToday} {tasksToday === 1 ? "task" : "tasks"}
              </Text>
            </View>
          )}
          {tasksToday != 0 && billsToday != 0 && (
            <Text style={styles.textGrey}> and </Text>
          )}
          {billsToday != 0 && (
            <View style={{ flexDirection: "row", columnGap: 2 }}>
              <Icon name="cash-multiple" size={20} color="#562CAF" />
              <Text style={styles.textPurple}>
                {billsToday} {billsToday === 1 ? "bill" : "bills"}
              </Text>
            </View>
          )}
          <Text style={styles.textGrey}> due today.</Text>
        </View>
      ) : (
        <Text style={styles.textGrey}>You don't have any tasks due today!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textGrey: {
    color: "#C4BFB5",
    fontSize: 19.2,
    fontFamily: "Rebond-Grotesque-Medium",
  },

  textPurple: {
    color: "#562CAF",
    fontSize: 19.2,
    fontFamily: "Rebond-Grotesque-Medium",
  },
});

export default HeaderHomeScreen;
