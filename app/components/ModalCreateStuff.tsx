import { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTask } from "@/hooks/useTask";
import CreateTaskModal from "@/components/CreateTaskModal";
import CreateBillModal from "@/components/CreateBillModal";

const { height } = Dimensions.get("window");

type ModalCreateStuffProps = {
  toggleModal: () => void;
  modalVisible: boolean;
};

const ModalCreateStuff = ({ toggleModal, modalVisible }: ModalCreateStuffProps) => {
  const [addTask, setAddTask] = useState(true);
  const { categories } = useTask();
  const dataRepeat = [
    { label: "Never", value: "never" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

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
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            width: "100%",
            height: height * 0.8,
            padding: height * 0.025,
            backgroundColor: "#F7F6F0",
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={{ rowGap: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  columnGap: 16,
                }}
              >
                <TouchableOpacity
                  onPress={() => setAddTask(true)}
                  style={
                    addTask && {
                      backgroundColor: "#DDD8CE",
                      borderRadius: 50,
                    }
                  }
                >
                  <Text
                    style={{
                      fontSize: 19.2,
                      fontFamily: "Rebond-Grotesque-Medium",
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }}
                  >
                    Task
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setAddTask(false)}
                  style={
                    !addTask && {
                      backgroundColor: "#DDD8CE",
                      borderRadius: 50,
                    }
                  }
                >
                  <Text
                    style={{
                      fontSize: 19.2,
                      fontFamily: "Rebond-Grotesque-Medium",
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }}
                  >
                    Bill
                  </Text>
                </TouchableOpacity>
              </View>

              {addTask ? (
                <CreateTaskModal
                  categories={categories}
                  dataRepeat={dataRepeat}
                  toggleModal={toggleModal}
                />
              ) : (
                <CreateBillModal
                  dataRepeat={dataRepeat}
                  toggleModal={toggleModal}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCreateStuff;
