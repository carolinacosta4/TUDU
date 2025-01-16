import { Image, Text, View } from "react-native";
import { Fragment } from "react";
import User from "@/interfaces/User";

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
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Rebond-Grotesque-Medium",
            lineHeight: 20,
          }}
        >
          See All
        </Text>
      </View>
      {achievements.length > 0 ? (
        achievements.map((achievement) => (
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
        <Text>Work harder to have achievements!!</Text>
      )}
    </View>
  );
};

export default YourAchievements;
