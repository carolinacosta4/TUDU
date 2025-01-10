import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import ModalCreateStuff from "./ModalCreateStuff";

const { width } = Dimensions.get("window");
const NoTasksView = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 20 }}>
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
            Nothing here!
          </Text>
          <Text
            style={{
              color: "#A5A096",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 16,
              paddingHorizontal: 50,
              fontFamily: "Rebond-Grotesque-Medium",
              lineHeight: 20,
            }}
          >
            Let's get started and make your day more productive!
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 14,
              backgroundColor: "#562CAF",
              borderRadius: 24,
              width: width * 0.24,
            }}
            onPress={toggleModal}
          >
            <Text
              style={{
                color: "#F7F6F0",
                fontSize: 19.2,
                fontFamily: "Rebond-Grotesque-Bold",
                lineHeight: 20,
              }}
            >
              + Add
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <ModalCreateStuff toggleModal={toggleModal} modalVisible={modalVisible} /> */}
    </>
  );
};

export default NoTasksView;
