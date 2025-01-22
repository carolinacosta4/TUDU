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
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        backgroundColor: "#DDD8CE",
        borderRadius: 16,
      }}
    >
      <Link href={{ pathname: "/bill/[id]", params: { id: bill._id } }}>
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
              lineHeight: 20,
            }}
          >
            {bill.name}
          </Text>
          <Text
            style={{
              fontSize: 13.3,
              color: "#A5A096",
              fontFamily: "Rebond-Grotesque-Regular",
              lineHeight: 20,
            }}
          >
            {bill.amount}
            {bill.IDcurrency.symbol}
          </Text>
        </View>
      </Link>
      {bill.status ? (
        <TouchableWithoutFeedback
          onPress={() => {
            changeStatus(bill, "bill");
          }}
        >
          <Icon name="check-circle" size={24} color="#562CAF" />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            changeStatus(bill, "bill");
          }}
        >
          <Icon name="circle-outline" size={24} color="#562CAF" />
        </TouchableWithoutFeedback>
      )}
    </View>
  ) : (
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
      <Link href={{ pathname: "/bill/[id]", params: { id: bill._id } }}>
        <View style={{ width: '94%', flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 16,
            color: "#291752",
            fontFamily: "Rebond-Grotesque-Medium",
            lineHeight: 20,
          }}
        >
          {bill.name}
        </Text>
          <Text
            style={{
              fontSize: 19.2,
              color: "#A5A096",
              fontFamily: "Rebond-Grotesque-Regular",
              lineHeight: 20,
              textAlign: "right",
            }}
          >
            {bill.amount}{bill.IDcurrency.symbol}
          </Text>
        </View>
        </Link>
      </View>
  );
};

export default BillItem;