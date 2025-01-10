import { Text, TouchableOpacity } from "react-native";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type RightActionProps = {
  ID: string;
  name: string;
  handleDelete: (id: string, type: string) => void;
};

const RightAction = (
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  { handleDelete, ID, name }: RightActionProps
) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 60 }],
    };
  });

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
        onPress={() => handleDelete(ID, name)}
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

export default RightAction;
