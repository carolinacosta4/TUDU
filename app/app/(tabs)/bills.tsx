import { View, Text, StyleSheet } from "react-native"; 
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useFonts from "@/hooks/useFonts";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";
import BillItem from "@/components/BillListForBillPage";
import { useBill } from "@/hooks/useBill";
import { useUser } from "@/hooks/useUser";
import Bill from "@/interfaces/Bill";
import HeaderBillPage from "@/components/HeaderBillPage";
import NoBillsView from "@/components/NoBillsView";
export default function BillsScreen() {
  const thismonth = new Date();
  const fontsLoaded = useFonts();
  const { logged } = useUserInfo();
  const { getBillsForMonth, bills, editBill } = useBill();
  const { loading } = useUser();
  const [loadingBills, setloadingBills] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading === false && logged === true) {
          const month = thismonth.getMonth() + 1; 
          const year = thismonth.getFullYear();
          await getBillsForMonth(month, year);
          setloadingBills(false);
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchData();
  }, [logged, loading]);

  const changeStatus = async (data: Bill, name: string) => {
    try {
      const updatedStatus = !data.status;
      await editBill(data._id, { status: updatedStatus });
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

  const upcomingBills = getUpcomingBills();

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
                <NoBillsView />
              ) : (
                <>
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
                </>
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
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#EEEADF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  footerContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 16,
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
    width: '100%',
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
