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
import Task from "@/interfaces/Task";
const { width, height } = Dimensions.get("window");

type EditTaskProps = {
  task: Task,
  handleEdit: () => void
}

export default function EditTask({ task, handleEdit }: EditTaskProps) {
  // console.log(task);
  const { editTask, categories } = useTask();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    task.IDcategory.name || ""
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(
    task.startDate ? new Date(task.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    task.endDate ? new Date(task.endDate) : new Date()
  );
  const [name, setName] = useState(task.name || "");
  const [priority, setPriority] = useState(task.priority || "");
  const [IDcategory, setIDcategory] = useState(task.IDcategory || "");
  const [periodicity, setPeriodicity] = useState(task.periodicity || "never");
  const [notification, setNotification] = useState(task.notification || false);
  const [notes, setNotes] = useState(task.notes || "Type here...");
  const editTaskItem = {
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

  const handleEditTask = () => {
    // if (editTaskItem.name === "") {
    //   alert("Please enter a name for the task");
    // } else if (editTaskItem.priority === "") {
    //   alert("Please select a priority for the task");
    // } else if (editTaskItem.IDcategory === "") {
    //   alert("Please select a category for the task");
    // } else if (editTaskItem.startDate == editTaskItem.endDate) {
    //   alert("Please different times for start and end");
    // } else {
    //   console.log("edit tbd");
    // }
    console.log(editTaskItem);
    handleEdit()
  };

  return (
    <>
      <View style={{ rowGap: 24 }}>
        <View style={{ rowGap: 8 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#A5A096",
              fontFamily: "Rebond-Grotesque-Regular",
              lineHeight: 20,
            }}
          >
            Task Name
          </Text>
          <TextInput
            value={name}
            style={{
              borderColor: "#C4BFB5",
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              fontFamily: "Rebond-Grotesque-Medium",
              color: "#474038",
              lineHeight: 20,
            }}
            placeholderTextColor={"#C4BFB5"}
            onChangeText={setName}
          />
        </View>

        <View style={{ rowGap: 8 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#A5A096",
              fontFamily: "Rebond-Grotesque-Regular",
              lineHeight: 20,
            }}
          >
            Priority
          </Text>
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
            value={priority}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setPriority(item.value);
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <View style={{ rowGap: 16 }}>
          <View style={{ rowGap: 8 }}>
            <Text
              style={{
                fontFamily: "Rebond-Grotesque-Regular",
                fontSize: 16,
                color: "#A5A096",
                lineHeight: 20,
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
                        lineHeight: 20,
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
                lineHeight: 20,
              }}
            >
              Start
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
              data={[
                { label: "Never", value: "never" },
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
              ]}
              labelField="label"
              valueField="value"
              value={periodicity} // Valor selecionado
              placeholder="Select repeat frequency"
              onChange={(item) => {
                setPeriodicity(item.value); // Atualiza o estado quando o usuário seleciona uma opção
              }}
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
              style={{
                padding: 10,
                paddingBottom: 100,
                borderRadius: 8,
                backgroundColor: "#EEEADF60",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
                color: "#474038",
              }}
              value={notes}
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
        <TouchableOpacity
                style={{
                  backgroundColor: "#6B47DC",
                  padding: height * 0.012,
                  borderRadius: 16,
                  height: 48,
                  justifyContent: "center",
                }}
                onPress={handleEditTask}
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
      </View>
    </>
  );
}
