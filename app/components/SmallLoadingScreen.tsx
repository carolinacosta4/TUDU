import LottieView from "lottie-react-native";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const SmallLoadingScreen = () => {
  return (
    <View style={{ height: height/3, justifyContent: "center", alignItems: "center", backgroundColor: '#ffffff'}}>
      <LottieView
        style={{ height: height, width: width, marginTop: -80 }}
        source={require("@/assets/lotties/loading.json")}
        autoPlay
        loop
      />
      
    </View>
  );
};

export default SmallLoadingScreen;
