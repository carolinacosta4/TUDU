import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useFonts from "@/hooks/useFonts";
import { useTask } from "@/hooks/useTask";
import { ScrollView } from "react-native";
import CreateTaskModal from "@/components/CreateTaskModal";
import CreateBillModal from "@/components/CreateBillModal";

const { width, height } = Dimensions.get("window");

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [addTask, setAddTask] = useState(true);
  const { categories } = useTask();
  const fontsLoaded = useFonts();
  const dataRepeat = [
    { label: "Never", value: "never" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

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
            lineHeight: 20
          }}
        >
          + Add
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback
          onPress={(e) => {
            e.target === e.currentTarget && toggleModal();
          }}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
        </TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              width: "100%",
              height: height * 0.8,
              padding: height * 0.025,
              backgroundColor: "#F7F6F0",
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
            }}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              <View style={{ rowGap: 24 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    columnGap: 16,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setAddTask(true)}
                    style={
                      addTask && {
                        backgroundColor: "#DDD8CE",
                        borderRadius: 50,
                      }
                    }
                  >
                    <Text
                      style={{
                        fontSize: 19.2,
                        fontFamily: "Rebond-Grotesque-Medium",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        lineHeight: 20
                      }}
                    >
                      Task
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setAddTask(false)}
                    style={
                      !addTask && {
                        backgroundColor: "#DDD8CE",
                        borderRadius: 50,
                      }
                    }
                  >
                    <Text
                      style={{
                        fontSize: 19.2,
                        fontFamily: "Rebond-Grotesque-Medium",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        lineHeight: 20
                      }}
                    >
                      Bill
                    </Text>
                  </TouchableOpacity>
                </View>

                {addTask ? (
                  <CreateTaskModal
                    categories={categories}
                    dataRepeat={dataRepeat}
                    toggleModal={toggleModal}
                  />
                ) : (
                  <CreateBillModal
                    dataRepeat={dataRepeat}
                    toggleModal={toggleModal}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: (height * 0.09) / 2,
  },

  activeIconBackground: {
    backgroundColor: "#EEE5F520",
    borderRadius: 36,
    width: 48,
    height: 48,
  },
});
