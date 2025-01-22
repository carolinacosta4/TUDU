import LottieView from "lottie-react-native";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

type LoadingScreenProps = {
  type?: String
};

const LoadingScreen = ({type}: LoadingScreenProps) => {  
  return (
    <View style={{ marginBottom: width / 0.1, height: type == undefined ? height * 0.75 : height * 0.45, justifyContent: "flex-start", alignItems: "center",}}>
      <LottieView
        style={{ flex: type === undefined ? 1 : undefined, width: width * 0.8, height: height * 0.3 }}
        source={require("@/assets/lotties/loading.json")}
        autoPlay
        loop
      />
      {type != 'calendar' && <Text
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
      }
    </View>
  );
};

export default LoadingScreen;