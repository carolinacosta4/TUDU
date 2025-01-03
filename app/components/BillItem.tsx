import Bill from "@/interfaces/Bill";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";

const RightAction = ({
  progress,
  dragX,
  handleDelete,
  bill,
}: {
  progress: Reanimated.SharedValue<number>;
  dragX: Reanimated.SharedValue<number>;
  handleDelete: (id: string, type: string) => void;
  bill: Bill;
}) => {
  const derivedTranslation = useDerivedValue(() => dragX.value + 60);

  const styleAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: derivedTranslation.value }],
  }));

  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableOpacity
        style={{
          backgroundColor: "#EF4444",
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: "100%",
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
        onPress={() => handleDelete(bill._id, "bill")}
      >
        <Text
          style={{
            width: 50,
            color: "#F7F6F0",
            textAlign: "center",
            fontFamily: "Rebond-Grotesque-Medium",
            fontSize: 13.3,
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

type BillItemProps = {
  bill: Bill;
  changeStatus: (data: Bill, name: "bill") => void;
  type: string;
  handleDelete: (id: string, type: string) => void;
};

const BillItem = ({
  bill,
  changeStatus,
  type,
  handleDelete,
}: BillItemProps) => {
  return type == "cards" ? (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        containerStyle={{
          backgroundColor: "#DDD8CE",
          borderRadius: 16,
        }}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={(progress, dragX) => (
          <RightAction
            progress={progress}
            dragX={dragX}
            handleDelete={handleDelete}
            bill={bill}
          />
        )}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 10,
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
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
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
  );
};

export default BillItem;
