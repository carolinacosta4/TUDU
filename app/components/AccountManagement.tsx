import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalAccount from "./ModalAccount";

type AccountManagementProps = {
  handleLogout: () => void;
  handleDeactivate: () => void;
  handleDelete: () => void;
};

const AccountManagement = ({
  handleLogout,
  handleDeactivate,
  handleDelete,
}: AccountManagementProps) => {
  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);
  const [modalVisibleDeactivate, setModalVisibleDeactivate] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);

  const toggleModalLogout = () => {
    setModalVisibleLogout(!modalVisibleLogout);
  };

  const toggleModalDeactivate = () => {
    setModalVisibleDeactivate(!modalVisibleDeactivate);
  };

  const toggleModalDelete = () => {
    setModalVisibleDelete(!modalVisibleDelete);
  };

  return (
    <View>
      <View style={{ rowGap: 10 }}>
        <Text style={styles.title}>Account Management</Text>
        <TouchableOpacity
          style={{ ...styles.button, marginTop: 20 }}
          onPress={toggleModalLogout}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <Icon name="logout" size={24} color="#291752" />
            <Text style={{ ...styles.options, color: "#291752" }}>Logout</Text>
          </View>
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleModalDeactivate}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <Icon name="block-helper" size={24} color="#635C54" />
            <Text style={{ ...styles.options, color: "#635C54" }}>
              Deactivate account
            </Text>
          </View>
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleModalDelete}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <Icon name="delete-outline" size={24} color="#EF4444" />
            <Text style={{ ...styles.options, color: "#EF4444" }}>
              Delete account
            </Text>
          </View>
          <Icon name="chevron-right" size={24} />
        </TouchableOpacity>
      </View>

      <ModalAccount
        modalVisible={modalVisibleLogout}
        toggleModal={toggleModalLogout}
        handleModal={handleLogout}
        title="Are you sure you want to logout?"
        button="Yes"
        modalName="logout"
      />

      <ModalAccount
        modalVisible={modalVisibleDeactivate}
        toggleModal={toggleModalDeactivate}
        handleModal={handleDeactivate}
        text="This can be undone anytime, but you'll be unable to interact with tasks or payments until then."
        title="Deactivate your account"
        button="Deactivate"
      />

      <ModalAccount
        modalVisible={modalVisibleDelete}
        toggleModal={toggleModalDelete}
        handleModal={handleDelete}
        text="Are you sure you want to delete your account? This action cannot be undone!"
        title="Delete your account"
        button="Delete"
      />
    </View>
  );
};

export default AccountManagement;

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

  button: {
    borderBottomColor: "#DDD8CE",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
