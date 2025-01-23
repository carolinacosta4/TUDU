import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";
import Animated, { ZoomOut} from "react-native-reanimated";
import React, { useRef } from "react";

type AnimatedOnboardingType = {
    type: number
}
const AnimatedOnboarding = ({type}: AnimatedOnboardingType) => {
    const AnimatedLottie  = Animated.createAnimatedComponent(LottieView)
    const animation = useRef<LottieView>(null)

    return (
    type == 14 ? 
    <Animated.View style={{ alignContent: 'center', height: 300, width: 300, alignItems: 'center', justifyContent: 'center', paddingTop: Dimensions.get("window").width *0.2}}>
        <AnimatedLottie
            exiting={ZoomOut}
            ref={animation}
            autoPlay
            loop={true}
            style={{
            width: 1200,
            height: 'auto',
            aspectRatio: 1,
            }}
            source={require('@/assets/lotties/data_lazyanimation.json')}
        />
    </Animated.View> : type == 15 ? 
    <Animated.View style={{ alignContent: 'center', height: 300, width: 200, alignItems: 'center', justifyContent: 'center', paddingBottom: Dimensions.get("window").width *0.2, paddingLeft: Dimensions.get("window").width *0.1}}>
        <AnimatedLottie
            exiting={ZoomOut}
            ref={animation}
            autoPlay
            loop={true}
            style={{
            width: 1200,
            height: 'auto',
            aspectRatio: 1,
            }}
            source={require('@/assets/lotties/data_lasymascot.json')}
        />
    </Animated.View>
    : type == 16 && 
    <Animated.View style={{ alignContent: 'center', height: 300, width: 300, alignItems: 'center', justifyContent: 'center', paddingTop: Dimensions.get("window").width *0.3, paddingRight: Dimensions.get("window").width *0.1}}>
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
