import { Text, View, Image, StyleSheet } from "react-native";

type StreaksItemProps = {
  userStreak: {
    date: any;
    streak: number;
  };
};

const StreaksItem = ({ userStreak }: StreaksItemProps) => {
  const today = new Date();

  return (
    <View>
      {userStreak.date != 0 ? (
        userStreak.date.toISOString().split("T")[0] ==
        today.toISOString().split("T")[0] ? (
          <View style={styles.container}>
            <Image
              source={require("@/assets/images/streak.png")}
              style={styles.image}
            />
            <Text style={styles.numberActive}>{userStreak.streak}</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Image
              source={require("@/assets/images/streak-off.png")}
              style={styles.image}
            />
            <Text style={styles.numberInactive}>{userStreak.streak}</Text>
          </View>
        )
      ) : (
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/streak-off.png")}
            style={styles.image}
          />
          <Text style={styles.numberInactive}>{userStreak.streak}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 6,
    alignItems: "center",
  },

  image: { width: 24, objectFit: "contain" },

  numberActive: {
    fontFamily: "SF-Pro-Display-Bold",
    fontSize: 23.04,
    color: "#F59E0B",
  },

  numberInactive: {
    fontFamily: "SF-Pro-Display-Bold",
    fontSize: 23.04,
    color: "#A5A096",
  },
});

export default StreaksItem;
