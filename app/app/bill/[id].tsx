import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Vibration,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import useFonts from "@/hooks/useFonts";
import Bill from "@/interfaces/Bill";
import { formatDate } from "@/utils/taskUtils";
import { useBillStore } from "@/stores/billStore";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useUser } from "@/hooks/useUser";
import useAchievementsStore from "@/stores/achievementsStore";
import useUserStore from "@/stores/userStore";
import { analyseAchievement } from "@/utils/achievementUtils";
import LoadingScreen from "@/components/LoadingScreen";
import EditBill from "@/components/EditBill";
import HeaderItem from "@/components/Header";

const BillDetail = () => {
  const fontsLoaded = useFonts();
  const { id } = useLocalSearchParams();
  const {updateBill, deleteBill, fetchBill, bill, loadingBill} = useBillStore();
  const {userInfo} = useUserInfo()
  const { user } = useUser();
  const {fetchUser} = useUserStore()
  const {unlockAchievement} = useAchievementsStore()
  const [edit, setEdit] = useState<Boolean>(false);

  useEffect(() => {
    if (typeof id === "string") {
      fetchBill(id);
    }
  }, [bill]);

  
  useEffect(() => {
    if(userInfo) {
      fetchUser(userInfo.userID)
    }
  }, [userInfo])

  if (!bill || !fontsLoaded || !userInfo || loadingBill) {
    return (
      <View style={styles.container}>
         <LoadingScreen />
      </View>
    );
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          backgroundColor: "#EF444440",
          borderRadius: 6,
          width: 40,
        };
      case "medium":
        return {
          borderRadius: 6,
          backgroundColor: "#FBD16060",
          width: 61,
        };
      case "low":
        return {
          backgroundColor: "#B8DEA480",
          borderRadius: 6,
          width: 38,
        };
      default:
        return {};
    }
  };

  const handleDeleteBill = () => {
    deleteBill(bill._id, userInfo.authToken);
    router.push("/");
  };

  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [1 * ONE_SECOND_IN_MS];

  const handleMarkAsDone = async (bill: Bill) => {
    try {
      let newStatus = !bill.status;
      await updateBill(bill._id, { status: newStatus }, userInfo.authToken);
    
      if (user?.data.vibration && newStatus === true) {
        Platform.OS === "android"
        ? Vibration.vibrate(1 * ONE_SECOND_IN_MS)
        : Vibration.vibrate(PATTERN);
      }
      await analyseAchievement("Clean Sweep", user, userInfo, unlockAchievement)
      
    } catch (error: any) {
      console.error("Error message:", error);
    }
  };

  const handleEdit = () => {
    let newEdit = !edit;
    setEdit(newEdit);
  };

  return (
    bill && (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F6F0" }}>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 20, }}>
          <View style={{ width: 28 }}>
            <HeaderItem page="Bill" />
          </View>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 23.04,
                color: "#562CAF",
                fontFamily: "SF-Pro-Display-Medium",
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              Bill
            </Text>
          </View>
        </View>
          {edit ? (
            <ScrollView style={styles.container}>
              <Text>Edit view</Text>
              <EditBill bill={bill} handleEdit={handleEdit}/>
            </ScrollView>
          ) : (
            <ScrollView style={styles.container}>
              <View style={styles.billHeader}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13.33,
                      color: "#474038",
                      fontFamily: "Rebond-Grotesque-Medium",
                      padding: 4,
                      textAlign: "center",
                      lineHeight: 24,
                      ...getPriorityStyle(bill.priority),
                    }}
                  >
                    {bill.priority.charAt(0).toUpperCase() +
                      bill.priority.slice(1)}
                  </Text>
                  <TouchableOpacity onPress={handleEdit}>
                    <Text
                      style={{
                        fontFamily: "Rebond-Grotesque-Medium",
                        fontSize: 16,
                        color: "#562CAF",
                        textAlign: "right",
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.billTitle}>{bill.name}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Due date</Text>
                <Text
                  style={{ ...styles.startDate, backgroundColor: "#EEEADF" }}
                >
                  {formatDate(bill.dueDate)}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Amount</Text>
                <Text style={styles.schedule}>
                  {bill.amount}{bill.IDcurrency.symbol}
                </Text>
              </View>

              

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Schedule</Text>
                <Text style={styles.schedule}>
                  {bill.periodicity.charAt(0).toUpperCase() +
                    bill.periodicity.slice(1)}{" "}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notes</Text>
                {bill.notes && <Text style={styles.notes}>{bill.notes}</Text>}
                {!bill.notes && <Text style={styles.notes}>No notes yet!</Text>}
              </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Options</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteBill}
              >
                <Text style={styles.deleteText}>Delete Bill</Text>
              </TouchableOpacity>
            </View>

              {!bill.status ? (
                <TouchableOpacity
                  style={{ ...styles.checkButton, backgroundColor: "#6A60F0" }}
                  onPress={() => handleMarkAsDone(bill)}
                >
                  <Text style={styles.checkText}>Check as done</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ ...styles.checkButton, backgroundColor: "#837D74" }}
                  onPress={() => handleMarkAsDone(bill)}
                >
                  <Text style={styles.checkText}>Uncheck as done</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 20,
    justifyContent: "flex-start",
    textAlign: "left",
  },
  time: {
    fontSize: 16,
    color: "#888",
  },
  billHeader: {
    marginBottom: 20,
    flex: 1,
  },
  priority: {
    fontSize: 16,
    color: "#FFC107",
    backgroundColor: "#FFF7E0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  billTitle: {
    fontSize: 33.18,
    fontWeight: "bold",
    color: "#291752",
    fontFamily: "SF-Pro-Display-Medium",
    flexShrink: 1,
  },
  category: {
    fontSize: 16,
    color: "#A64D79",
  },
  startInfo: {
    alignItems: "flex-start",
    marginBottom: 20,
    fontFamily: "Rebond-Grotesque-Medium",
    fontSize: 13.33,
  },
  startDate: {
    fontSize: 16,
    color: "#291752",
    lineHeight: 24,
    fontFamily: "Rebond-Grotesque-Medium",
    backgroundColor: "#EEEADF",
    padding: 10,
    borderRadius: 8,
  },
  section: {
    marginBottom: 20,
    fontFamily: "Rebond-Grotesque-Medium",
  },
  sectionTitle: {
    fontSize: 19.2,
    color: "#291752",
    marginBottom: 10,
    lineHeight: 24,
    fontFamily: "Rebond-Grotesque-Medium",
  },
  schedule: {
    fontSize: 16,
    color: "#291752",
    lineHeight: 24,
    fontFamily: "Rebond-Grotesque-Medium",
    backgroundColor: "#EEEADF",
    padding: 10,
    borderRadius: 8,
  },
  notes: {
    fontSize: 16,
    color: "#A5A096",
    lineHeight: 24,
    fontFamily: "Rebond-Grotesque-Medium",
    backgroundColor: "#EEEADF",
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#EEEADF",
    padding: 10,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  deleteText: {
    fontSize: 16,
    color: "#D32F2F",
    fontFamily: "Rebond-Grotesque-Medium",
  },
  checkButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  checkText: {
    fontSize: 18,
    color: "#FFF",
    fontFamily: "Rebond-Grotesque-Bold",
  },
});

export default BillDetail;
