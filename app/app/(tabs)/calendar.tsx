import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useFonts from "@/hooks/useFonts";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect } from "react";
import { router } from "expo-router";

export default function CalendarScreen() {
  const fontsLoaded = useFonts();
  const { logged } = useUserInfo();

  useEffect(() => {
    if (logged === false) {
      router.push("/register");
    }
  }, [logged]);

  if (!fontsLoaded) return <Text>Loading...</Text>;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Calendar page</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
