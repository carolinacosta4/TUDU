import LottieView from "lottie-react-native";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import Animated, {FadeIn, FadeOut, ZoomIn, ZoomOut} from "react-native-reanimated";
import React, { useRef } from "react";

type AnimatedOnboardingType = {
    url: string,
    type: number
}
const AnimatedOnboarding = ({url, type}: AnimatedOnboardingType) => {
    const AnimatedLottie  = Animated.createAnimatedComponent(LottieView)
    const animation = useRef<LottieView>(null)

    return (
    type == 14 ? 
    <Animated.View style={{ alignContent: 'center', height: 300, width: 300, alignItems: 'center', justifyContent: 'center', paddingTop: Dimensions.get("window").width *0.3}}>
        <AnimatedLottie
            exiting={ZoomOut}
            ref={animation}
            autoPlay
            loop={true}
            style={{
            width: 1400,
            height: 'auto',
            aspectRatio: 1,
            }}
            source={require('@/assets/lotties/data_lazyanimation.json')}
        />
    </Animated.View> : type == 15 ? 
    <Animated.View style={{ alignContent: 'center', height: 300, width: 300, alignItems: 'center', justifyContent: 'center', paddingBottom: Dimensions.get("window").width *0.2}}>
        <AnimatedLottie
            exiting={ZoomOut}
            ref={animation}
            autoPlay
            loop={true}
            style={{
            width: 1400,
            height: 'auto',
            aspectRatio: 1,
            }}
            source={require('@/assets/lotties/data_lasymascot.json')}
        />
    </Animated.View>
    : type == 16 && 
    <Animated.View style={{ alignContent: 'center', height: 300, width: 300, alignItems: 'center', justifyContent: 'center', paddingTop: Dimensions.get("window").width *0.4, paddingRight: Dimensions.get("window").width *0.1}}>
        <AnimatedLottie
            exiting={ZoomOut}
            ref={animation}
            autoPlay
            loop={true}
            style={{
            width: 1400,
            height: 'auto',
            aspectRatio: 1,
            }}
            source={require('@/assets/lotties/data_perfectamimation.json')}
        />
    </Animated.View>
  );
};

export default AnimatedOnboarding;
