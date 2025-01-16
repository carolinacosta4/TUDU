import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"; 
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";
import BillItem from "@/components/BillListForBillPage";
import { useUser } from "@/hooks/useUser";
import Bill from "@/interfaces/Bill";
import HeaderBillPage from "@/components/HeaderBillPage";
import { useBillStore } from "@/stores/billStore";
import NoTasksView from "@/components/NoTasksView";

export default function BillsScreen() {
  const width = Dimensions.get("window").width;
  const thismonth = new Date();
  const { userInfo, logged } = useUserInfo();
  const { bills, updateBill, fetchMonthBills } = useBillStore()
  const { loading, handleGetUser, user } = useUser();
  const [loadingBills, setloadingBills] = useState(true);
  const [upcomingBills, setUpcomingBills] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading === false && logged === true) {
          const month = thismonth.getMonth() + 1; 
          const year = thismonth.getFullYear();
          if(userInfo) await fetchMonthBills(month, year, userInfo.authToken);
          // if(userInfo) handleGetUser(userInfo.userID);
          // console.log(user?.userBills);
          
          setloadingBills(false);
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchData();
  }, [logged, loading]);

  useEffect(() => {
    setUpcomingBills(getUpcomingBills());  
  }, [user?.userBills]);

  const changeStatus = async (data: Bill, name: string) => {
    try {
      const updatedStatus = !data.status;
      if(userInfo) await updateBill(data._id, { status: updatedStatus }, userInfo.authToken);
    } catch (error) {
      console.error(error);
    }
  };
  
  const calculateProgress = () => {
    const currentBills = getCurrentMonthBills();
    const totalBills = currentBills.length;
    const paidBills = currentBills.filter((bill) => bill.status).length;
    return totalBills === 0 ? 0 :  Math.round((paidBills / totalBills) * 100);
  };

  const pendingBill = () => {
    const currentBills = bills.filter((bill) => {
      const billDate = new Date(bill.dueDate);
      const isPastUnpaidBill = billDate < thismonth && !bill.status; 
      const isFutureUnpaidBill = billDate >= thismonth && !bill.status; 
      return isPastUnpaidBill || isFutureUnpaidBill;
    });
    return currentBills.length > 0 ? currentBills[0] : null;
  };

  const nextPayment = () => {
    const upcomingUnpaidBills = bills.filter((bill) => {
      const billDate = new Date(bill.dueDate);
      return billDate > thismonth && !bill.status; 
    });

    const sortedUpcomingBills = upcomingUnpaidBills.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    return sortedUpcomingBills.length > 0 ? sortedUpcomingBills[0] : null;
  };

  const activeBillsCount = () => {
    const currentBills = bills.filter((bill) => !bill.status);
    return currentBills.length;
  }

  const getUpcomingBills = () => {
    return bills.filter(bill => {
      const billDate = new Date(bill.dueDate);
      const isCurrentMonth = 
        billDate.getMonth() === thismonth.getMonth() &&
        billDate.getFullYear() === thismonth.getFullYear();
        
      return !isCurrentMonth && billDate > thismonth; 
    });
  };

  const getCurrentMonthBills = () => {
    return bills.filter(bill => {
      const billDate = new Date(bill.dueDate);
      return (
        billDate.getMonth() === thismonth.getMonth() &&
        billDate.getFullYear() === thismonth.getFullYear()
      ); 
    });
  };

  const monthsTotal = () => {
    const currentBills = getCurrentMonthBills();
    const totalAmount = currentBills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
    return totalAmount;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containerScrollView}>
        <View style={styles.container}>
        <HeaderBillPage progress={calculateProgress()} activeBillsCount={activeBillsCount()} pendingBill={pendingBill()} nextPayment={nextPayment()} monthsTotal={monthsTotal()}/>
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>My bills</Text>
              </View>
              {bills.length === 0 ? (
                <NoTasksView />
              ) : (
                  <ScrollView>
                    <View style={{ marginBottom: width / 0.8 }}>
                  <View style={styles.thisMonth}>
                    <Text style={styles.monthLabel}>This month</Text>
                    <View style={styles.billItem}>
                      {getCurrentMonthBills().map((bill) => (
                        <BillItem key={bill._id} bill={bill} changeStatus={changeStatus} />
                      ))}
                    </View>
                  </View>
                  {upcomingBills.length > 0 && (
                    <View style={styles.upcomingMonths}>
                      <Text style={styles.upcomingLabel}>Upcoming months</Text>
                      <View style={styles.billItem}>
                        {upcomingBills.map((bill) => (
                          <BillItem key={bill._id} bill={bill} changeStatus={changeStatus} />
                        ))}
                      </View>
                    </View>
                  )}
                    </View>
                  </ScrollView>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#291752',
    fontSize: 23.04,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '700',
    lineHeight: 34.56,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  containerScrollView: {
    flex: 1,
    backgroundColor: '#F7F6F0',
    paddingTop: 10,
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 37,
    backgroundColor: '#F7F6F0',
  },
  footer: {
    width: '100%',
    height: '100%',
    padding: 24,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EEEADF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  footerContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: 32,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  thisMonth: {
    width: '98%',
    flexDirection: 'column',
    gap: 12,
  },
  monthLabel: {
    color: '#A5A096',
    fontSize: 13.33,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
  },
  billItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  upcomingMonths: {
    width: '100%',
    flexDirection: 'column',
    gap: 12,
  },
  upcomingLabel: {
    color: '#A5A096',
    fontSize: 13.33,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
  },
});
