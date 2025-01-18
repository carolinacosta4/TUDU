import LottieView from "lottie-react-native";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const LoadingScreen = () => {
  return (
    <View style={{ marginBottom: width / 0.1, height: height * 0.75 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("@/assets/lotties/loading.json")}
        autoPlay
        loop
      />
      <Text
        style={{
          fontSize: 16,
          color: "#562CAF",
          fontFamily: "Rebond-Grotesque-Medium",
          padding: 4,
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        Loading...
      </Text>
    </View>
  );
};

export default LoadingScreen;
