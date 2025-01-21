import { Stack } from "expo-router";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import useFonts from "@/hooks/useFonts";
import AnimatedSplashScreen from '@/components/AnimatedSplashScreen'
import Animated, { FadeIn } from "react-native-reanimated";

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false)
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false)
  const fontsLoaded = useFonts({
    "Rebond-Grotesque-Regular": require("@/assets/fonts/ESRebondGrotesqueTRIAL-Regular-BF66189040b697b.otf"),
    "Rebond-Grotesque-Medium": require("@/assets/fonts/ESRebondGrotesqueTRIAL-Medium-BF6618904088566.otf"),
    "Rebond-Grotesque-Bold": require("@/assets/fonts/ESRebondGrotesqueTRIAL-Bold-BF66189040400df.otf"),
    "SF-Pro-Display-Medium": require("@/assets/fonts/SFPRODISPLAYMEDIUM.otf"),
    "SF-Pro-Display-Bold": require("@/assets/fonts/SFPRODISPLAYBOLD.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded]);

  const showAnimatiedSplash = !appReady || !splashAnimationFinished 
  if (showAnimatiedSplash) {
    return (
      <AnimatedSplashScreen onAnimationFinish={(isCancelled) => {
        if (!isCancelled) {
          setSplashAnimationFinished(true)}}
        }
      />
    )
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
          <Animated.View style={{flex: 1}} entering={FadeIn}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="recoverPassword" options={{ headerShown: false }} />
              <Stack.Screen name="tips/[tipId]" options={{ headerShown: false }} />
              <Stack.Screen name="tips" options={{ headerShown: false }} />
              <Stack.Screen name="favorites" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen
                name="resetPassword/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="task/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="bill/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="achievements" options={{ headerShown: false }}/>
            </Stack>
          </Animated.View>
    </GestureHandlerRootView>
  );
}
