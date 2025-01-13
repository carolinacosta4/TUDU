import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
} from "react-native";
import useFonts from "@/hooks/useFonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

type ModalAccountProps = {
  modalVisible: boolean;
  toggleModal: () => void;
  text?: string;
  title: string;
  button: string;
  modalName?: string;
  handleModal: (
    currentPassword?: string,
    newPassword?: string,
    confirmNewPassword?: string,
    newName?: string,
    newEmail?: string
  ) => void;
  error?: string;
  showError?: boolean;
};

const ModalAccount = ({
  modalVisible,
  toggleModal,
  handleModal,
  title,
  text,
  button,
  modalName,
  error,
  showError,
}: ModalAccountProps) => {
  const { height } = Dimensions.get("window");
  const fontsLoaded = useFonts();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  if (!fontsLoaded) return <Text>Loading...</Text>;

  const handleBtn = () => {
    if (modalName == "password") {
      handleModal(currentPassword, newPassword, confirmNewPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else if (modalName == "personalInfo") {
      handleModal(newName, newEmail);
      setNewName("");
      setNewEmail("");
    } else {
      handleModal();
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback
        onPress={(e) => {
          e.target === e.currentTarget && toggleModal();
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
      </TouchableWithoutFeedback>
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: "100%",
            height:
              modalName == "logout"
                ? height * 0.25
                : !modalName
                ? height * 0.3
                : height * 0.45,
            padding: height * 0.025,
            backgroundColor: "#F7F6F0",
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            rowGap: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomColor: "#DDD8CE",
              borderBottomWidth: 2,
            }}
          >
            <Text
              style={{
                fontSize: 19.2,
                color: "#474038",
                fontFamily: "Rebond-Grotesque-Bold",
                lineHeight: 20,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              {title}
            </Text>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: "#EEEADF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="close" size={24} color="#474038" />
            </TouchableOpacity>
          </View>
          {text && (
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
              }}
            >
              {text}
            </Text>
          )}
          {modalName == "password" ? (
            <View style={{ rowGap: 8 }}>
              <TextInput
                placeholder="Current password"
                style={{
                  padding: 10,
                  borderColor: "#C4BFB5",
                  borderWidth: 1,
                  borderRadius: 12,
                  fontFamily: "Rebond-Grotesque-Regular",
                  lineHeight: 20,
                  fontSize: 16,
                }}
                placeholderTextColor={"#C4BFB5"}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />

              <TextInput
                placeholder="New password"
                style={{
                  padding: 10,
                  borderColor: "#C4BFB5",
                  borderWidth: 1,
                  borderRadius: 12,
                  fontFamily: "Rebond-Grotesque-Regular",
                  lineHeight: 20,
                  fontSize: 16,
                }}
                placeholderTextColor={"#C4BFB5"}
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <TextInput
                placeholder="Confirm new password"
                style={{
                  padding: 10,
                  borderColor: "#C4BFB5",
                  borderWidth: 1,
                  borderRadius: 12,
                  fontFamily: "Rebond-Grotesque-Regular",
                  lineHeight: 20,
                  fontSize: 16,
                }}
                placeholderTextColor={"#C4BFB5"}
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
              />
            </View>
          ) : (
            modalName == "personalInfo" && (
              <View style={{ rowGap: 8 }}>
                <TextInput
                  placeholder="New name"
                  style={{
                    padding: 10,
                    borderColor: "#C4BFB5",
                    borderWidth: 1,
                    borderRadius: 12,
                    fontFamily: "Rebond-Grotesque-Regular",
                    lineHeight: 20,
                    fontSize: 16,
                  }}
                  placeholderTextColor={"#C4BFB5"}
                  value={newName}
                  onChangeText={setNewName}
                />

                <TextInput
                  placeholder="New e-mail"
                  style={{
                    padding: 10,
                    borderColor: "#C4BFB5",
                    borderWidth: 1,
                    borderRadius: 12,
                    fontFamily: "Rebond-Grotesque-Regular",
                    lineHeight: 20,
                    fontSize: 16,
                  }}
                  placeholderTextColor={"#C4BFB5"}
                  value={newEmail}
                  onChangeText={setNewEmail}
                />
              </View>
            )
          )}
          {showError && (
            <Text
              style={{
                color: "#EC221F",
                fontFamily: "Rebond-Grotesque-Regular",
                lineHeight: 20,
                fontSize: 16,
              }}
            >
              {error}
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: "#474038",
                borderWidth: 1,
                padding: 10,
                borderRadius: 50,
                width: "35%",
                alignItems: "center",
              }}
              onPress={toggleModal}
            >
              <Text
                style={{
                  color: "#474038",
                  fontFamily: "Rebond-Grotesque-Medium",
                  lineHeight: 20,
                  fontSize: 19.2,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: button === "Delete" ? "#EC221F" : "#562CAF",
                padding: 10,
                borderRadius: 50,
                width: "60%",
                alignItems: "center",
              }}
              onPress={handleBtn}
            >
              <Text
                style={{
                  color: "#EEEADF",
                  fontFamily: "Rebond-Grotesque-Bold",
                  lineHeight: 20,
                  fontSize: 19.2,
                }}
              >
                {button}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAccount;
