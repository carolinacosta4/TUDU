import { useBill } from "@/hooks/useBill";
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
import Bill from "@/interfaces/Bill";
const { width, height } = Dimensions.get("window");

type EditBillProps = {
  bill: Bill,
  handleEdit: () => void
}


export default function EditBill({ bill, handleEdit }: EditBillProps) {
        
  const { editBill } = useBill();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState(
    bill.dueDate ? new Date(bill.dueDate) : new Date()
  );
  const [name, setName] = useState(bill.name || "");
  const [priority, setPriority] = useState(bill.priority || "");
  const [amount, setAmount] = useState(bill.amount || "");
  const [periodicity, setPeriodicity] = useState(bill.periodicity || "never");
  const [notification, setNotification] = useState(bill.notification || false);
  const [notes, setNotes] = useState(bill.notes || "Type here...");
  const editBillItem = {
    name: name,
    priority: priority,
    startDate: dueDate.toISOString(),
    amount: Number(amount),
    periodicity: periodicity,
    notification: notification,
    notes: notes,
  };

  const handleConfirm = (date: Date): void => {
    setDueDate(date);
    setShowDatePicker(false);
  };

  const handleEditBill = () => {
    if (editBillItem.name === "") {
      alert("Please enter a name for the task");
    } else if (editBillItem.amount === 0) {
      alert("Please enter an amount for the task");
    } else if (editBillItem.priority === "") {
      alert("Please select a priority for the task");
    } else {
      // editBill(bill._id, editBillItem);
      console.log(editBillItem);
      
    }
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
            Bill Name
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
            Amount
          </Text>
          <TextInput
            value={amount.toString()}
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
            onChangeText={setAmount}
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
                  lineHeight: 20,
                }}
              >
                {dueDate.toLocaleString("en-GB", {
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
              isVisible={showDatePicker}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={() => setShowDatePicker(false)}
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
          onPress={handleEditBill}
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
