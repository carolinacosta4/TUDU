import { Stack } from "expo-router";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger } from "react-native-reanimated";

configureReanimatedLogger({
  strict: false,
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="recoverPassword" options={{ headerShown: false }} />
        <Stack.Screen
          name="resetPassword/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      <Stack.Screen name="task/[id]" />
      </Stack>
    </GestureHandlerRootView>
  );
}
