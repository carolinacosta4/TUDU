import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalAccount from "./ModalAccount";

type AccountSettingsProps = {
  handlePersonalInfo: (newName?: string, newEmail?: string) => void;
  pickImage: () => void;
  handlePassword: (newPassword: string, oldPassword: string) => void;
};

const AccountSettings = ({
  handlePersonalInfo,
  pickImage,
  handlePassword,
}: AccountSettingsProps) => {
  const [modalVisiblePassword, setModalVisiblePassword] = useState(false);
  const [modalVisiblePersonalInfo, setModalVisiblePersonalInfo] =
    useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<string | any>();

  const toggleModalPersonalInfo = () => {
    setModalVisiblePersonalInfo(!modalVisiblePersonalInfo);
  };

  const toggleModalPassword = () => {
    setModalVisiblePassword(!modalVisiblePassword);
  };
  const handleEditPersonalInfo = async (
    newName?: string,
    newEmail?: string
  ) => {
    if (!newName && !newEmail) {
      setShowError(true);
      setError("Please fill the fields");
      return;
    }
    try {
      await handlePersonalInfo(newName, newEmail);
      setShowError(false);
      setError("");
      setModalVisiblePersonalInfo(false);
    } catch (err: any) {
      setShowError(true);
      setError(err);
    }
  };

  const handleEditPassword = async (
    currentPassword?: string,
    newPassword?: string,
    confirmNewPassword?: string
  ) => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setShowError(true);
      setError("Please fill the fields");
      return;
    }
    if (newPassword != confirmNewPassword) {
      setShowError(true);
      setError("Passwords do not match");
      return;
    }
    try {
      await handlePassword(newPassword, currentPassword);
      setShowError(false);
      setError("");
      setModalVisiblePassword(false);
    } catch (err: any) {
      setShowError(true);
      setError(err);
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.title}>Account Settings</Text>
      <View style={{ rowGap: 10 }}>
        <TouchableOpacity
          style={{ ...styles.buttonSettings, marginTop: 20 }}
          onPress={toggleModalPersonalInfo}
        >
          <Text style={styles.options}>Personal Information</Text>
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSettings} onPress={pickImage}>
          <Text style={styles.options}>Profile Picture</Text>
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.buttonSettings, marginBottom: 20 }}
          onPress={toggleModalPassword}
        >
          <Text style={styles.options}>Password</Text>
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
      </View>

      <ModalAccount
        modalVisible={modalVisiblePersonalInfo}
        toggleModal={toggleModalPersonalInfo}
        handleModal={handleEditPersonalInfo}
        title="Edit personal information"
        text="Edit your name or email, a validation will be required to finish and save your new information"
        button="Confirm"
        modalName="personalInfo"
        error={error}
        showError={showError}
      />

      <ModalAccount
        modalVisible={modalVisiblePassword}
        toggleModal={toggleModalPassword}
        handleModal={handleEditPassword}
        title="Edit password"
        button="Confirm"
        modalName="password"
        error={error}
        showError={showError}
      />
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  title: {
    fontSize: 19.2,
    color: "#291752",
    fontFamily: "Rebond-Grotesque-Medium",
    marginTop: 20,
    lineHeight: 20,
  },

  options: {
    fontSize: 16,
    fontFamily: "Rebond-Grotesque-Regular",
    padding: 10,
    lineHeight: 20,
  },

  buttonSettings: {
    borderBottomColor: "#DDD8CE",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
