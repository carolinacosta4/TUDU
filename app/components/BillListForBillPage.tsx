import React from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions} from 'react-native'
import Bill from "@/interfaces/Bill";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
interface BillItemProps {
  bill: Bill;
  changeStatus: (data: Bill, name: "bill") => void;
}

const BillItem = ({ bill, changeStatus }: BillItemProps) => {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          backgroundColor: '#EF444440', 
        };
      case 'medium':
        return {
          backgroundColor: '#FBD16060', 
        };
      case 'low':
        return {
          backgroundColor: '#B8DEA480',
        };
      default:
        return {};
    }
  };

  const priorityStyles = getPriorityStyle(bill.priority);

  return (
    <View style={styles.billItem}>
      <View style={[styles.dateBox, styles.dateBoxOneBill]}>
        <Text style={styles.dateText}>{new Date(bill.dueDate).getDate()}</Text>
        <Text style={styles.dateMonth}>{new Date(bill.dueDate).toLocaleString('default', { month: 'short' })}</Text>
      </View>
      <View style={styles.billsContainer}>
          <View style={styles.billDetailsContainer}>
            <Link href={{ pathname: "/bill/[id]", params: { id: bill._id } }}>
            <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.billInfoBox}>
                <Text style={styles.billTitle}>{bill.name}</Text>
                <View style={[styles.billStatus, { backgroundColor: priorityStyles.backgroundColor }]}>
                    <Text style={styles.billStatusText}>{bill.priority}</Text>
                </View>
              </View>
             
            <View style={styles.billCost}>
              <Text style={styles.amountBillCost}>{bill.amount}{bill.IDcurrency.symbol}</Text>
            </View>
            </View>
            </Link>
        {bill.status ? (
          <TouchableWithoutFeedback
            onPress={() => {
              changeStatus(bill, "bill");
            }}
          >
            <Icon name="check-circle" size={20} color="#562CAF" />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              changeStatus(bill, "bill");
            }}
          >
            <Icon name="circle-outline" size={20} color="#562CAF" />
          </TouchableWithoutFeedback>
        )}
            </View>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    paddingVertical: 4
  },
  dateBox: {
    backgroundColor: '#291752',
    width: Dimensions.get('window').width * 0.2,
    height: 'auto',
    marginRight: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dateBoxOneBill: {
    height: 72,
  },
  dateBoxMultipleBills: {
    flexGrow: 1, 
  },
  dateText: {
    color: '#F7F6F0',
    fontSize: 23.04,
    fontFamily: 'SF Pro Display',
    fontWeight: '700',
    lineHeight: 34.56,
    wordWrap: 'break-word'
  },
  dateMonth: {
    color: '#F7F6F0',
    fontSize: 16,
    fontFamily: 'Rebond-Grotesque-Medium',
    fontWeight: '400',
    lineHeight: 16,
    wordWrap: 'break-word'
  },
  billDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 'auto',
    backgroundColor: '#F7F6F0',
  },
  billsContainer: {
    flexDirection: 'column',
    gap: 12,
    width: Dimensions.get('window').width * 0.6,
  },
  billInfoBox: {
    flexDirection: 'column',
    gap: 4,
  },
  billTitle: {
    color: '#291752',
    fontSize: 19.20,
    fontFamily: 'Rebond-Grotesque-Medium',
    fontWeight: '500',
    lineHeight: 24,
    wordWrap: 'break-word',
  },
  billStatus: {
    paddingVertical: 4,
    alignItems: 'center',
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  billStatusText: {
    color: '#352D26',
    fontSize: 13.33,
    fontFamily: 'Rebond-Grotesque-Medium',
    fontWeight: '500',
    wordWrap: 'break-word',
    lineHeight: 20,
  },
  billCost: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    height: '100%',
  },
  circleIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#291752',
    borderRadius: 12,
  },
  amountBillCost: {
    color: '#291752',
    fontSize: 19.20,
    fontFamily: 'Rebond-Grotesque-Medium',
    fontWeight: '500',
    lineHeight: 24,
    wordWrap: 'break-word',
  },
});



export default BillItem;
