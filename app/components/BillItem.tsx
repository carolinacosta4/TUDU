import Bill from "@/interfaces/Bill";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

type BillItemProps = {
  bill: Bill;
  changeStatus: (data: Bill, name: "bill") => void;
  type: string;
};

const BillItem = ({ bill, changeStatus, type }: BillItemProps) => {
  return type == "cards" ? (
    <Link href={{ pathname: "/bill/[id]", params: { id: bill._id } }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F7F6F0",
          padding: 10,
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#291752",
              fontFamily: "Rebond-Grotesque-Medium",
            }}
          >
            {bill.name}
          </Text>
          <Text
            style={{
              fontSize: 13.3,
              color: "#A5A096",
              fontFamily: "Rebond-Grotesque-Regular",
            }}
          >
            {bill.amount}€
          </Text>
        </View>
        {bill.status ? (
          <TouchableWithoutFeedback
            onPress={() => {
              changeStatus(bill, "bill");
            }}
          >
            <Icon name="check-circle" size={20} color="#562CAF" />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              changeStatus(bill, "bill");
            }}
          >
            <Icon name="circle-outline" size={20} color="#562CAF" />
          </TouchableWithoutFeedback>
        )}
      </View>
    </Link>
  ) : (
    <Link href={{ pathname: "/bill/[id]", params: { id: bill._id } }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          rowGap: 16,
          columnGap: 10,
        }}
      >
        {bill.status ? (
          <TouchableWithoutFeedback
            onPress={() => {
              changeStatus(bill, "bill");
            }}
          >
            <Icon name="check-circle" size={25} color="#562CAF" />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              changeStatus(bill, "bill");
            }}
          >
            <Icon name="circle-outline" size={25} color="#562CAF" />
          </TouchableWithoutFeedback>
        )}

        <Text
          style={{
            fontSize: 16,
            color: "#291752",
            fontFamily: "Rebond-Grotesque-Medium",
          }}
        >
          {bill.name}
        </Text>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Text
            style={{
              fontSize: 19.2,
              color: "#A5A096",
              fontFamily: "Rebond-Grotesque-Regular",
              textAlign: "right",
            }}
          >
            {bill.amount}€
          </Text>
        </View>
      </View>
    </Link>
  );
};

export default BillItem;
