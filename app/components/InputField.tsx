import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type InputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  icon: string;
  passwordIcon?: string;
  setPasswordShown?: (value: boolean) => void;
  passwordShown?: boolean;
};

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  icon,
  passwordIcon,
  setPasswordShown,
  passwordShown,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={24} color="#562CAF" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#C4BFB5"
      />
      {passwordIcon && setPasswordShown && (
        <TouchableOpacity onPress={() => setPasswordShown(!passwordShown)}>
          <Icon name={passwordIcon} size={24} color="#562CAF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F6F0",
    width: 308,
    borderRadius: 12,
    fontSize: 16,
    paddingLeft: 12,
    columnGap: 8,
  },
  input: {
    width: 220,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 12,
    height: 48,
    fontSize: 16,
    fontFamily: "Rebond-Grotesque-Regular",
    lineHeight: 20,
  },
});
