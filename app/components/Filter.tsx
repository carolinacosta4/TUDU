import { useState } from "react";
import { View, TouchableWithoutFeedback, Modal } from "react-native";
import useFonts from "@/hooks/useFonts";
import ModalContent from "./ModalContent";

interface FilterProps {
  onClose: () => void;
  visible: boolean;
  onFilterChange: (selection: {
    category: string;
    filter: string;
    group: string;
    layout: string;
    sortBy: string;
  }) => void;
  categories: { _id: string; name: string }[];
  filterSelection: {
    category: string;
    filter: string;
    group: string;
    layout: string;
    sortBy: string;
  };
  setFilterSelection: (selection: {
    category: string;
    filter: string;
    group: string;
    layout: string;
    sortBy: string;
  }) => void;
}

const Filter = ({
  onClose,
  visible,
  onFilterChange,
  categories,
  filterSelection,
  setFilterSelection,
}: FilterProps) => {
  const [shownModal, setShownModal] = useState("default");
  const fontsLoaded = useFonts();
  if (!fontsLoaded) return null;

  const handleFilterSelection = (key: string, selection: string) => {
    const newFilters = { ...filterSelection, [key]: selection };
    setFilterSelection(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback
        onPress={(e) => {
          e.target === e.currentTarget && onClose();
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {shownModal == "default" && (
            <ModalContent
              setShownModal={setShownModal}
              onClose={onClose}
              title="default"
              selectedParams={filterSelection}
            />
          )}

          {shownModal == "group" && (
            <ModalContent
              setShownModal={setShownModal}
              title="Group"
              parameters={[
                { name: "All", value: "all" },
                { name: "Tasks", value: "tasks" },
                { name: "Bills", value: "bills" },
              ]}
              functions={[
                () => handleFilterSelection("group", "all"),
                () => handleFilterSelection("group", "tasks"),
                () => handleFilterSelection("group", "bills"),
              ]}
              selected={filterSelection.group}
            />
          )}

          {shownModal == "sort" && (
            <ModalContent
              setShownModal={setShownModal}
              title="Sort By"
              parameters={[
                { name: "Ascending", value: "ascending" },
                { name: "Descending", value: "descending" },
              ]}
              functions={[
                () => handleFilterSelection("sortBy", "ascending"),
                () => handleFilterSelection("sortBy", "descending"),
              ]}
              selected={filterSelection.sortBy}
            />
          )}

          {shownModal == "layout" && (
            <ModalContent
              setShownModal={setShownModal}
              title="Layout"
              parameters={[
                { name: "Cards", value: "cards" },
                { name: "List", value: "list" },
              ]}
              functions={[
                () => handleFilterSelection("layout", "cards"),
                () => handleFilterSelection("layout", "list"),
              ]}
              selected={filterSelection.layout}
            />
          )}

          {shownModal == "filter" && (
            <ModalContent
              setShownModal={setShownModal}
              title="Filter"
              parameters={[
                { name: "All", value: "all" },
                { name: "High", value: "high" },
                { name: "Medium", value: "medium" },
                { name: "Low", value: "low" },
              ]}
              functions={[
                () => handleFilterSelection("filter", "all"),
                () => handleFilterSelection("filter", "high"),
                () => handleFilterSelection("filter", "medium"),
                () => handleFilterSelection("filter", "low"),
              ]}
              selected={filterSelection.filter}
            />
          )}

          {shownModal == "category" && (
            <ModalContent
              setShownModal={setShownModal}
              title="Category"
              parameters={[
                { name: "All", value: "all" },
                ...categories.map((category) => ({
                  name: category.name,
                  value: category._id,
                })),
              ]}
              functions={[
                () => handleFilterSelection("category", "all"),
                ...categories.map(
                  (category) => () =>
                    handleFilterSelection("category", category._id)
                ),
              ]}
              selected={filterSelection.category}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Filter;
