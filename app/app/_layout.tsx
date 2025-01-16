import { Stack } from "expo-router";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="recoverPassword" options={{ headerShown: false }} />
        <Stack.Screen name="tips/[tipId]" options={{ headerShown: false }} />
      <Stack.Screen
          name="resetPassword/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      <Stack.Screen name="task/[id]" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
