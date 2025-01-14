import { Text, StyleSheet, Image, View, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useFonts from "@/hooks/useFonts";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Fragment, useEffect, useState } from "react";
import { router } from "expo-router";
import { useUserStore } from "@/stores/userStore";
import { useAchievementsStore } from "@/stores/achievementsStore";
import Achievement from "@/interfaces/Achievement";

export default function AchievementsScreen() {
  const fontsLoaded = useFonts();
  const { logged } = useUserInfo();
  const { user } = useUserStore();
  const { achievements, fetchAchievements } = useAchievementsStore();
  const [achievementsList, setAchievementsList] = useState<Achievement[]>([]);
  const [userAchievements, setuserAchievements] = useState([]);

  useEffect(() => {
    if (logged === false) {
      router.push("/register");
    }
  }, [logged]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (achievements.length > 0) {
      const lockedAchievements = achievements.filter(
        (achievement) =>
          !user.userAchievements.find(
            (userAchievement) =>
              userAchievement.IDAchievements._id === achievement._id
          )
      );
      setAchievementsList(lockedAchievements);
    }
  }, [achievements, user.userAchievements]);

  if (!fontsLoaded || !user) return <Text>Loading...</Text>;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text
            style={{
              fontSize: 16,
              color: "#474038",
              fontFamily: "Rebond-Grotesque-Medium",
              padding: 4,
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            Achievements page
          </Text>
          {user.userAchievements.length > 0 && achievementsList.length > 0 ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                {user.userAchievements.map((achievement) => (
                  <Fragment key={achievement._id}>
                    <View style={styles.cardItems}>
                      <Image
                        source={{ uri: achievement.IDAchievements.image }}
                        style={{
                          width: undefined,
                          height: 102,
                          aspectRatio: 1,
                          resizeMode: "contain",
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 13.33,
                          color: "#291752",
                          fontFamily: "SF-Pro-Display-Medium",
                          padding: 4,
                          lineHeight: 24,
                        }}
                      >
                        {achievement.IDAchievements.name}
                      </Text>
                    </View>
                  </Fragment>
                ))}
              
                {achievementsList.map((achievement) => (
                  <Fragment key={achievement._id}>
                    <View style={styles.cardItems}>
                      <Image
                        source={{ uri: achievement.lockedImage }}
                        style={{
                          width: undefined,
                          height: 102,
                          aspectRatio: 1,
                          resizeMode: "contain",
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 13.33,
                          color: "#291752",
                          fontFamily: "SF-Pro-Display-Medium",
                          padding: 4,
                          lineHeight: 24,
                        }}
                      >
                        {achievement.name}
                      </Text>
                    </View>
                  </Fragment>
                ))}
              </View>
          ) : (
            <Text
              style={{
                fontSize: 13.33,
                color: "#474038",
                fontFamily: "Rebond-Grotesque-Medium",
                padding: 4,
                lineHeight: 24,
              }}
            >
              No achievements yet
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardItems: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10, 
    borderRadius: 10, 
    padding: 10, 
  },
});
