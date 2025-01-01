import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useFonts from "@/hooks/useFonts";

const { width, height } = Dimensions.get("window");

export default function TabLayout() {
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
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            paddingLeft: width * 0.32,
            paddingRight: width * 0.04,
            paddingTop: height * 0.01,
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
          name="profile"
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
        />
      </Tabs>

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addText}>+ Add</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>This is your pop-up!</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#F7F6F0",
    borderRadius: 24,
    position: "absolute",
    bottom: height * 0.045,
    left: width * 0.1,
    width: width * 0.24,
    height: 48,
  },
  addText: {
    color: "#562CAF",
    fontSize: 19.2,
    fontFamily: "Rebond-Grotesque-Bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    padding: height * 0.025,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalText: {
    fontSize: width * 0.045,
    marginBottom: height * 0.025,
    marginRight: width * 0.025,
  },
  closeButton: {
    backgroundColor: "#6B47DC",
    padding: height * 0.012,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
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