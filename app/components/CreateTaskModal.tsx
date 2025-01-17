import { useUserInfo } from "@/hooks/useUserInfo";
import { useTaskStore } from "@/stores/taskStore";
import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Switch,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useAchievementsStore from "@/stores/achievementsStore";
import useUserStore from "@/stores/userStore";
import { analyseAchievement } from "@/utils/achievementUtils";

const { width, height } = Dimensions.get("window");

type CreateTaskModalProps = {
  categories: {
    _id: string;
    name: string;
    backgroundColor: string;
    color: string;
  }[];
  dataRepeat: { label: string; value: string }[];
  toggleModal: () => void;
};

export default function CreateTaskModal({
  categories,
  dataRepeat,
  toggleModal,
}: CreateTaskModalProps) {
  const { userInfo } = useUserInfo();
  const { addTask } = useTaskStore();
  const [isFocus, setIsFocus] = useState(false);
  const [valuePeriodicity, setValuePeriodicity] = useState("");
  const [valuePriority, setValuePriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [IDcategory, setIDcategory] = useState("");
  const [periodicity, setPeriodicity] = useState("never");
  const [notification, setNotification] = useState(false);
  const [notes, setNotes] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const {user, fetchUser} = useUserStore()
  const {unlockAchievement} = useAchievementsStore()

  const newTask = {
    name: name,
    priority: priority,
    IDcategory: IDcategory,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    periodicity: periodicity,
    notification: notification,
    notes: notes,
  };

  const handleConfirmStart = (date: Date): void => {
    setStartDate(date);
    setShowStartDatePicker(false);
  };

  const handleConfirmEnd = (date: Date): void => {
    setEndDate(date);
    setShowEndDatePicker(false);
  };

  useEffect(() => {
    if(userInfo) {
      fetchUser(userInfo.userID)
    }
  }, [userInfo])

  const handleCreateTask = async () => {
    if (newTask.name === "") {
      setShowError(true);
      setError("Please enter a name for the task");
    } else if (newTask.priority === "") {
      setShowError(true);
      setError("Please select a priority for the task");
    } else if (newTask.IDcategory === "") {
      setShowError(true);
      setError("Please select a category for the task");
    } else if (newTask.startDate == newTask.endDate) {
      setShowError(true);
      setError("Please select a valid time for the task");
    } else if (
      new Date(newTask.startDate).getDay() !=
        new Date(newTask.endDate).getDay() &&
      newTask.periodicity != "never"
    ) {
      setShowError(true);
      setError(
        "If you select a periodicity you can't set different days for the date."
      );
    } else {
      const startDateWithoutSeconds = new Date(startDate);
      startDateWithoutSeconds.setSeconds(0, 0);
      const endDateWithoutSeconds = new Date(endDate);
      endDateWithoutSeconds.setSeconds(0, 0);
      if (startDateWithoutSeconds >= endDateWithoutSeconds) {
        setShowError(true);
        setError("Please select a valid time for the task");
      } else {
        setShowError(false);
        setError("");
        if (userInfo) {
          await addTask(newTask, userInfo.authToken);
        } else {
          setShowError(true);
          setError("User information is missing");
        }
        toggleModal();
        if(userInfo) {
          await analyseAchievement("50 tasks challenge", user, userInfo, unlockAchievement)
          await analyseAchievement("20 daily tasks challenge", user, userInfo, unlockAchievement)
        }
      }
    }
  };

  return (
    <>
      <View style={{ rowGap: 24 }}>
        <TextInput
          placeholder="Task Name"
          style={{
            borderColor: "#C4BFB5",
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            fontFamily: "Rebond-Grotesque-Medium",
            lineHeight: 20,
            color: "#474038",
          }}
          placeholderTextColor={"#C4BFB5"}
          onChangeText={setName}
        />

        <Dropdown
          style={[
            {
              height: 40,
              borderColor: "#C4BFB5",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
              backgroundColor: "#F7F6F0",
            },
            isFocus && { borderColor: "#562CAF" },
          ]}
          containerStyle={{
            backgroundColor: "#F7F6F0",
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
          }}
          placeholderStyle={{
            fontSize: 13.33,
            fontFamily: "Rebond-Grotesque-Medium",
            lineHeight: 20,
            color: "#C4BFB5",
          }}
          selectedTextStyle={{
            fontSize: 13.33,
            fontFamily: "Rebond-Grotesque-Medium",
            lineHeight: 20,
            color: "#474038",
          }}
          iconStyle={{
            width: 24,
            height: 24,
          }}
          itemTextStyle={{
            fontSize: 13.33,
            color: "#A5A096",
            fontFamily: "Rebond-Grotesque-Regular",
            lineHeight: 20,
          }}
          data={[
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Priority"
          value={valuePriority}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setPriority(item.value);
            setValuePriority(item.value);
            setIsFocus(false);
          }}
        />

        <View style={{ rowGap: 16 }}>
          <View style={{ rowGap: 8 }}>
            <Text
              style={{
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
                fontSize: 16,
                color: "#A5A096",
              }}
            >
              Category
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                columnGap: 16,
                rowGap: 4,
              }}
            >
              {categories.map((category) => (
                <Fragment key={category._id}>
                  <TouchableOpacity
                    style={[
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 24,
                        paddingVertical: 4,
                        borderRadius: 50,
                        borderWidth: 1,
                      },
                      selectedCategory != category.name && {
                        borderColor: category.color,
                      },
                      selectedCategory == category.name && {
                        backgroundColor: category.backgroundColor,
                        borderColor: category.backgroundColor,
                      },
                    ]}
                    onPress={() => {
                      setSelectedCategory(category.name);
                      setIDcategory(category._id);
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Rebond-Grotesque-Medium",
                        fontSize: 13.3,
                        color: category.color,
                        lineHeight: 20,
                      }}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                </Fragment>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
              }}
            >
              Starts
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#EEEADF60",
              }}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text
                style={{
                  fontFamily: "Rebond-Grotesque-Regular",
                  lineHeight: 20,
                }}
              >
                {startDate.toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
              }}
            >
              End
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#EEEADF60",
              }}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text
                style={{
                  fontFamily: "Rebond-Grotesque-Regular",
                  lineHeight: 20,
                }}
              >
                {endDate.toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
              }}
            >
              Repeat
            </Text>
            <Dropdown
              style={[
                {
                  height: 20,
                  width: width * 0.2,
                  backgroundColor: "#F7F6F0",
                },
              ]}
              containerStyle={{
                backgroundColor: "#F7F6F0",
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8,
              }}
              placeholderStyle={{
                fontSize: 13.33,
                fontFamily: "Rebond-Grotesque-Medium",
                lineHeight: 20,
                color: "#474038",
                textAlign: "right",
              }}
              selectedTextStyle={{
                fontSize: 13.33,
                fontFamily: "Rebond-Grotesque-Medium",
                lineHeight: 20,
                color: "#474038",
                textAlign: "right",
              }}
              itemTextStyle={{
                fontSize: 13.33,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
              }}
              data={dataRepeat}
              placeholder={dataRepeat[0].label}
              labelField="label"
              valueField="value"
              value={valuePeriodicity}
              onChange={(item) => {
                setValuePeriodicity(item.value);
                setPeriodicity(item.value);
              }}
              renderRightIcon={() => null}
            />
          </View>
        </View>

        <View style={{ rowGap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
              }}
            >
              Allow notifications
            </Text>
            <Switch
              trackColor={{ false: "#D2D5DB", true: "#562CAF" }}
              thumbColor="#FFFFFF"
              onValueChange={() => setNotification(!notification)}
              value={notification}
              style={{ height: 24 }}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#EEEADF",
            }}
          ></View>
          <View style={{ rowGap: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
              }}
            >
              Add Notes
            </Text>
            <TextInput
              placeholder="Type here..."
              style={{
                padding: 10,
                paddingBottom: 100,
                borderRadius: 8,
                backgroundColor: "#EEEADF60",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
                color: "#474038",
              }}
              placeholderTextColor={"#C4BFB5"}
              onChangeText={setNotes}
            />

            <DateTimePickerModal
              isVisible={showStartDatePicker}
              mode="datetime"
              onConfirm={handleConfirmStart}
              onCancel={() => setShowStartDatePicker(false)}
            />

            <DateTimePickerModal
              isVisible={showEndDatePicker}
              mode="datetime"
              onConfirm={handleConfirmEnd}
              onCancel={() => setShowEndDatePicker(false)}
            />
          </View>
        </View>
      </View>
      {showError && <Text style={{ color: "red" }}>{error}</Text>}
      <TouchableOpacity
        style={{
          backgroundColor: "#6B47DC",
          padding: height * 0.012,
          borderRadius: 16,
          height: 48,
          justifyContent: "center",
        }}
        onPress={handleCreateTask}
      >
        <Text
          style={{
            color: "#F7F6F0",
            textAlign: "center",
            fontFamily: "Rebond-Grotesque-Bold",
            lineHeight: 20,
            borderRadius: 5,
            fontSize: 19.02,
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </>
  );
}
