import { useBill } from "@/hooks/useBill";
import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width, height } = Dimensions.get("window");

type CreateBillModalProps = {
  dataRepeat: { label: string; value: string }[];
  toggleModal: () => void;
};

export default function CreateBillModal({
  dataRepeat,
  toggleModal,
}: CreateBillModalProps) {
  const { createBill, currencies } = useBill();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [IDcurrency, setIDcurrency] = useState("");
  const [priority, setPriority] = useState("");
  const [periodicity, setPeriodicity] = useState("never");
  const [notification, setNotification] = useState(false);
  const [notes, setNotes] = useState("");
  const newTask = {
    name: name,
    priority: priority,
    amount: Number(amount),
    dueDate: dueDate.toISOString(),
    periodicity: periodicity,
    notification: notification,
    IDcurrency: IDcurrency,
    notes: notes,
  };

  const handleConfirm = (date: Date): void => {
    setDueDate(date);
    setShowDatePicker(false);
  };

  const handleCreateBill = () => {
    if (newTask.name === "") {
      alert("Please enter a name for the task");
    } else if (newTask.IDcurrency === "") {
      alert("Please select a currency for the task");
    } else if (newTask.amount === 0) {
      alert("Please enter an amount for the task");
    } else if (newTask.priority === "") {
      alert("Please select a priority for the task");
    } else {
      createBill(newTask);
      toggleModal();
    }
  };

  return (
    <>
      <View style={{ rowGap: 24 }}>
        <TextInput
          placeholder="Bill Name"
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
          data={currencies.map((currency) => ({
            label: currency.name,
            value: currency._id,
          }))}
          labelField="label"
          valueField="value"
          placeholder="Currency"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setIDcurrency(item.value);
            setValue(item.value);
            setIsFocus(false);
          }}
        />

        <TextInput
          placeholder="Amount"
          style={{
            borderColor: "#C4BFB5",
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            fontFamily: "Rebond-Grotesque-Medium",
            color: "#474038",
          }}
          placeholderTextColor={"#C4BFB5"}
          onChangeText={setAmount}
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
              Due date
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#EEEADF60",
              }}
              onPress={() => setShowDatePicker(true)}
            >
              <Text
                style={{
                  fontFamily: "Rebond-Grotesque-Regular",
                }}
              >
                {dueDate.toLocaleString("en-GB", {
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
                setPeriodicity(item.value);
                setValue(item.value);
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
              isVisible={showDatePicker}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={() => setShowDatePicker(false)}
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
        onPress={handleCreateBill}
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
