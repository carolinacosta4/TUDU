import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useFonts from "@/hooks/useFonts";
import { useUserInfo } from "@/hooks/useUserInfo";
import ModalCreateStuff from "@/components/ModalCreateStuff";

const { width, height } = Dimensions.get("window");

export default function TabLayout() {
  const { userInfo } = useUserInfo();
  const [modalVisible, setModalVisible] = useState(false);
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#6B47DC",
            marginHorizontal: width * 0.04,
            marginVertical: height * 0.03,
            borderRadius: 48,
            height: height * 0.09,
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            paddingTop: (height * 0.09) / 4,
            paddingLeft: width * 0.32,
            paddingRight: width * 0.04,
          },
          tabBarActiveTintColor: "#F7F6F0",
          tabBarInactiveTintColor: "#F7F6F0",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconBackground,
                ]}
              >
                <Icon name="home-outline" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="bills"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconBackground,
                ]}
              >
                <Icon name="cash-multiple" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconBackground,
                ]}
              >
                <Icon name="calendar-blank" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile/[id]"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconBackground,
                ]}
              >
                <Icon name="account-outline" size={size} color={color} />
              </View>
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("[id]/profile", { id: userInfo?.userID });
            },
          })}
        />
      </Tabs>

      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 14,
          backgroundColor: "#F7F6F0",
          borderRadius: 24,
          position: "absolute",
          bottom: (height * 0.09) / 2,
          left: width * 0.1,
          width: width * 0.24,
        }}
        onPress={toggleModal}
      >
        <Text
          style={{
            color: "#562CAF",
            fontSize: 19.2,
            fontFamily: "Rebond-Grotesque-Bold",
            lineHeight: 20,
          }}
        >
          + Add
        </Text>
      </TouchableOpacity>

      <ModalCreateStuff toggleModal={toggleModal} modalVisible={modalVisible} />
    </>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  activeIconBackground: {
    backgroundColor: "#EEE5F520",
    borderRadius: 36,
    width: 48,
    height: 48,
  },
});
