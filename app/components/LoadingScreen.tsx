import LottieView from "lottie-react-native";
import { View, Text } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={{ height: 600, aspectRatio: 1, alignContent: 'center' }}>
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
