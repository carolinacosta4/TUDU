import React, { useState, useRef } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModalCreateStuff from "./ModalCreateStuff";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("window");
const NoTasksView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const AnimatedLottie = Animated.createAnimatedComponent(LottieView);
  const animation = useRef<LottieView>(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 20, marginBottom: width / 0.8 }}>
          <Animated.View
            style={{
              height: 260,
              alignItems: "center",
              justifyContent: "center",
              paddingRight: Dimensions.get("window").width * 0.35,
            }}
          >
            <AnimatedLottie
              ref={animation}
              autoPlay
              loop={true}
              style={{
                width: 500,
                aspectRatio: 1,
              }}
              source={require("@/assets/lotties/data_default_sad_animation.json")}
            />
          </Animated.View>
          <Text
            style={{
              fontSize: 23.04,
              marginBottom: 4,
              marginTop: Dimensions.get("window").width * -0.2,
              fontFamily: "SF-Pro-Display-Medium",
            }}
          >
            Nothing here!
          </Text>
          <Text
            style={{
              color: "#A5A096",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 16,
              paddingHorizontal: 50,
              fontFamily: "Rebond-Grotesque-Medium",
              lineHeight: 20,
            }}
          >
            Let's get started and make your day more productive!
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 14,
              backgroundColor: "#562CAF",
              borderRadius: 24,
              width: width * 0.24,
            }}
            onPress={toggleModal}
          >
            <Text
              style={{
                color: "#F7F6F0",
                fontSize: 19.2,
                fontFamily: "Rebond-Grotesque-Bold",
                lineHeight: 20,
              }}
            >
              + Add
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalCreateStuff toggleModal={toggleModal} modalVisible={modalVisible} />
    </>
  );
};

export default NoTasksView;
