import { StyleSheet, Switch, Text, View } from "react-native";

type CustomizationProps = {
  handleNotifications: () => void;
  handleSound: () => void;
  handleVibration: () => void;
  notifications: boolean;
  sound: boolean;
  vibration: boolean;
};

const Customization = ({
  handleNotifications,
  handleSound,
  handleVibration,
  notifications,
  sound,
  vibration,
}: CustomizationProps) => {
  return (
    <View style={{ rowGap: 10 }}>
      <Text style={styles.title}>Customization</Text>
      <View style={styles.containers}>
        <Text style={styles.options}>Notifications</Text>
        <Switch
          trackColor={{ false: "#D2D5DB", true: "#562CAF" }}
          thumbColor="#FFFFFF"
          onValueChange={handleNotifications}
          value={notifications}
        />
      </View>
      <View style={styles.containers}>
        <Text style={styles.options}>Sounds</Text>
        <Switch
          trackColor={{ false: "#D2D5DB", true: "#562CAF" }}
          thumbColor="#FFFFFF"
          onValueChange={handleSound}
          value={sound}
        />
      </View>
      <View style={styles.containers}>
        <Text style={styles.options}>Vibration</Text>
        <Switch
          trackColor={{ false: "#D2D5DB", true: "#562CAF" }}
          thumbColor="#FFFFFF"
          onValueChange={handleVibration}
          value={vibration}
        />
      </View>
    </View>
  );
};

export default Customization;

const styles = StyleSheet.create({
  title: {
    fontSize: 19.2,
    color: "#291752",
    fontFamily: "Rebond-Grotesque-Medium",
    marginTop: 20,
    lineHeight: 20,
  },

  options: {
    fontSize: 16,
    fontFamily: "Rebond-Grotesque-Regular",
    paddingLeft: 10,
    lineHeight: 20,
  },

  containers: {
    borderBottomColor: "#DDD8CE",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
