import { useTask } from "@/hooks/useTask";
import React, { Fragment, useState } from "react";
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
  const { getTasks, createTask } = useTask();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
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

  const handleCreateTask = () => {
    if (newTask.name === "") {
      alert("Please enter a name for the task");
    } else if (newTask.priority === "") {
      alert("Please select a priority for the task");
    } else if (newTask.IDcategory === "") {
      alert("Please select a category for the task");
    } else if (newTask.startDate == newTask.endDate) {
      alert("Please different times for start and end");
    } else {
      createTask(newTask);
      toggleModal();
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
            color: "#C4BFB5",
          }}
          selectedTextStyle={{
            fontSize: 13.33,
            fontFamily: "Rebond-Grotesque-Medium",
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
          }}
          data={[
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Priority"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setPriority(item.value);
            setValue(item.value);
            setIsFocus(false);
          }}
        />

        <View style={{ rowGap: 16 }}>
          <View style={{ rowGap: 8 }}>
            <Text
              style={{
                fontFamily: "Rebond-Grotesque-Regular",
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
                color: "#474038",
                textAlign: "right",
              }}
              selectedTextStyle={{
                fontSize: 13.33,
                fontFamily: "Rebond-Grotesque-Medium",
                color: "#474038",
                textAlign: "right",
              }}
              itemTextStyle={{
                fontSize: 13.33,
                color: "#A5A096",
                fontFamily: "Rebond-Grotesque-Regular",
              }}
              data={dataRepeat}
              placeholder={dataRepeat[0].label}
              labelField="label"
              valueField="value"
              value={value}
              onChange={(item) => {
                setValue(item.value);
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
