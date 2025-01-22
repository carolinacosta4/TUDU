import { Image, Text, View } from "react-native";
import { Fragment } from "react";
import User from "@/interfaces/User";
import { Link } from "expo-router";

type YourAchievementsProps = {
  achievements: User["userAchievements"];
};

const YourAchievements = ({ achievements }: YourAchievementsProps) => {
  return (
    <View style={{ rowGap: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 19.2,
            color: "#291752",
            fontFamily: "Rebond-Grotesque-Medium",
            lineHeight: 20,
          }}
        >
          Your achievements
        </Text>
        <Link href={{pathname: "/achievements"}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Rebond-Grotesque-Medium",
              lineHeight: 20,
            }}
          >
            See All
          </Text>
        </Link>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-around' }}>
      {achievements.length > 0 ? (
        achievements.slice(0, 3).map((achievement) => (
          <Fragment key={achievement._id}>
            <Image
              source={{
                uri: achievement.IDAchievements.image,
              }}
              style={{
                width: undefined,
                height: 102,
                aspectRatio: 1,
                resizeMode: "contain",
                shadowColor: "#000",
                shadowOffset: {
                  width: 2,
                  height: 4,
                },
                shadowOpacity: 0.25,
              }}
            />
          </Fragment>
        ))
      ) : (
        <Text style={{paddingVertical: 20, fontSize: 16, lineHeight: 20, fontFamily: "Rebond-Grotesque-Regular", color: "#291752"}}>No achievements unlocked yet... time to shine!</Text>
      )}
      </View>
    </View>
  );
};

export default YourAchievements;
