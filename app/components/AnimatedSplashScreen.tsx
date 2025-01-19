import React, { useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { Stack } from "expo-router";
import Animated, {FadeIn, FadeOut, ZoomIn, ZoomOut} from "react-native-reanimated";

const AnimatedLottie  = Animated.createAnimatedComponent(LottieView)
// hacer una funcion de if user already logged entonces aparece la otra animacion y aparece el onboarding y si no, entonces aparece la de logged
 const AnimatedSplashScreen = ({
    onAnimationFinish = (isCancelled) => {},
}: {
    onAnimationFinish?: (isCancelled: boolean) => void
    }) => {
    const animation = useRef<LottieView>(null)
    
    return (
        <Animated.View
        style = {styles.container}
        >
            <Stack.Screen />
            <AnimatedLottie
                exiting={ZoomOut}
                ref={animation}
                autoPlay
                loop={false}
                onAnimationFinish={(onAnimationFinish)}
                style={{
                width: '100%',
                height: '100%',
                
                }}
                source={require('@/assets/lotties/splashscreen_logged_animation.json')}
            />
        </Animated.View>
    )
}

export default AnimatedSplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#61549F'
    }
})