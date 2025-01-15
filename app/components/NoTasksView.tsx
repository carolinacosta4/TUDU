import { Image, Text, View } from "react-native";

const NoTasksView = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 50 }}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716115/r0wwfbnf1g4qme1vcexn.png",
        }}
        style={{ width: 122.71, height: 133, marginBottom: 24 }}
      />
      <Text
        style={{
          fontSize: 23.04,
          marginBottom: 4,
          fontFamily: "SF-Pro-Display-Medium",
        }}
      >
        No tasks here!
      </Text>
      <Text
        style={{
          color: "#A5A096",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 16,
          paddingHorizontal: 50,
          fontFamily: "Rebond-Grotesque-Medium",
        }}
      >
        Let's get started and make your day more productive!
      </Text>
    </View>
  );
};

export default NoTasksView;
