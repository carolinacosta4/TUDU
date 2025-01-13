import { Text, View, Dimensions, Image } from "react-native";

type UserAccountInfoProps = {
  user: {
    name: string;
    email: string;
    IDmascot: {
      name: string;
      image: string;
      description: string;
    };
  };
};

const UserAccountInfo = ({ user }: UserAccountInfoProps) => {
  const { height } = Dimensions.get("window");

  return (
    <View style={{ rowGap: 30 }}>
      <View
        style={{
          alignItems: "center",
          marginTop: height * 0.1,
        }}
      >
        <Text
          style={{
            fontSize: 27.65,
            fontFamily: "SF-Pro-Display-Bold",
            color: "#562CAF",
          }}
        >
          {user.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Rebond-Grotesque-Regular",
            color: "#635C54",
            lineHeight: 20,
          }}
        >
          {user.email}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 20,
          paddingRight: "40%",
          paddingLeft: "5%",
        }}
      >
        <Image
          source={{ uri: user.IDmascot.image }}
          style={{
            width: undefined,
            height: 109.71,
            aspectRatio: 1,
            resizeMode: "contain",
          }}
        />
        <View style={{ rowGap: 2 }}>
          <Text
            style={{
              fontSize: 23.04,
              fontFamily: "SF-Pro-Display-Bold",
              color: "#291752",
            }}
          >
            {user.IDmascot.name}
          </Text>
          <Text
            style={{
              color: "#474038",
              fontSize: 13.33,
              flexWrap: "wrap",
              fontFamily: "Rebond-Grotesque-Regular",
              lineHeight: 20,
            }}
          >
            {user.IDmascot.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserAccountInfo;
