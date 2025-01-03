import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useFonts from "@/hooks/useFonts";
import { useState } from "react";
import { useTask } from "@/hooks/useTask";

interface ModalContentProps {
  setShownModal: (modal: string) => void;
  onClose?: () => void;
  title: string;
  parameters?: {
    name: string;
    value: string;
  }[];
  functions?: (() => void)[];
  selected?: string;
  selectedParams?: {
    group: string;
    sortBy: string;
    layout: string;
    filter: string;
    category: string;
  };
}

const ModalContent = ({
  setShownModal,
  onClose,
  title,
  parameters = [],
  functions = [],
  selected,
  selectedParams,
}: ModalContentProps) => {
  const fontsLoaded = useFonts();
  const { categories } = useTask();
  const [selectedParameter, setSelectedParameter] = useState();
  if (!fontsLoaded) return <Text>Loading...</Text>;

  const rowRender = (
    icon: string,
    modal: string,
    text: string,
    selected: string
  ) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setShownModal(modal);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 14,
        }}
      >
        <Icon
          name={icon}
          size={24}
          color="#474038"
          style={{ marginLeft: 10 }}
        />
        <Text
          style={{
            fontFamily: "Rebond-Grotesque-Regular",
            color: "#474038",
            fontSize: 16,
          }}
        >
          {text}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 10,
            alignItems: "center",
          }}
        >
          {modal == "category" ? (
            <Text
              style={{
                color: "#A5A096",
                fontSize: 16,
                fontFamily: "Rebond-Grotesque-Regular",
              }}
            >
              {categories?.find((category) => category._id === selected)
                ?.name || "All"}
            </Text>
          ) : (
            <Text
              style={{
                color: "#A5A096",
                fontSize: 16,
                fontFamily: "Rebond-Grotesque-Regular",
              }}
            >
              {selected.charAt(0).toUpperCase() + selected.slice(1)}
            </Text>
          )}
          <Icon name="chevron-right" size={14} color="#A5A096" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return title == "default" ? (
    <View
      style={{
        ...styles.container,
        padding: 16,
        justifyContent: "center",
        flex: 1,
        height: 380,
      }}
    >
      <Text
        style={{
          fontFamily: "Rebond-Grotesque-Bold",
          fontSize: 19.2,
          marginLeft: 6,
          color: "#291752",
        }}
      >
        My Stuff
      </Text>
      <View
        style={{
          ...styles.separator,
          marginTop: 10,
        }}
      ></View>

      <View style={{ marginTop: 16, rowGap: 8 }}>
        {selectedParams &&
          rowRender("view-day-outline", "group", "Group", selectedParams.group)}
        <View style={styles.separator}></View>
        {selectedParams &&
          rowRender("sort", "sort", "Sort By", selectedParams.sortBy)}
        <View style={styles.separator}></View>
        {selectedParams &&
          rowRender("table", "layout", "Layout", selectedParams.layout)}
        <View style={styles.separator}></View>
        {selectedParams &&
          rowRender(
            "filter-variant",
            "filter",
            "Filter",
            selectedParams.filter
          )}
        <View style={styles.separator}></View>
        {selectedParams &&
          rowRender(
            "widgets-outline",
            "category",
            "Category",
            selectedParams.category
          )}
        <View
          style={{
            ...styles.separator,
            marginBottom: 16,
          }}
        ></View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#562CAF",
          width: "100%",
          padding: 6,
          alignItems: "center",
          justifyContent: "center",
          height: 48,
          borderRadius: 16,
        }}
        onPress={onClose}
      >
        <Text
          style={{
            fontFamily: "Rebond-Grotesque-Bold",
            color: "#F7F6F0",
            fontSize: 19.02,
            textAlign: "center",
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={{
        ...styles.container,
        paddingVertical: 16,
        height: 380,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="chevron-left"
          size={20}
          color="#291752"
          style={{ position: "absolute", left: 10 }}
          onPress={() => setShownModal("default")}
        />
        <Text
          style={{
            fontFamily: "Rebond-Grotesque-Bold",
            fontSize: 19.2,
            color: "#291752",
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          ...styles.separator,
          marginTop: 10,
        }}
      ></View>
      <View style={{ marginTop: 16, rowGap: 8, paddingHorizontal: 12 }}>
        {parameters.map((parameter: any, index: number) => (
          <View key={index} style={{ rowGap: 8 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setSelectedParameter(parameter.value);
                if (functions[index]) functions[index]();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Rebond-Grotesque-Regular",
                    color: "#291752",
                    fontSize: 16,
                    marginLeft: 6,
                  }}
                >
                  {parameter.name}
                </Text>
                {selected == parameter.value && (
                  <Icon
                    name="check"
                    size={14}
                    color="#291752"
                    style={{ marginRight: 10 }}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
            {index != parameters.length - 1 && (
              <View style={styles.separator}></View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#DDD8CE",
  },

  container: {
    flexDirection: "column",
    backgroundColor: "#F7F6F0",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    bottom: 0,
    position: "absolute",
    width: "100%",
    zIndex: 1000,
    flex: 1,
  },
});

export default ModalContent;
