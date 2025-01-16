import React from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Bill from "@/interfaces/Bill";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
interface BillItemProps {
  bill: Bill;
  changeStatus: (data: Bill, name: "bill") => void;
}

const BillItem = ({ bill, changeStatus }: BillItemProps) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.4)', 
        };
      case 'medium':
        return {
          backgroundColor: 'rgba(251, 209, 96, 0.4)', 
        };
      case 'low':
        return {
          backgroundColor: 'rgba(184, 222, 164, 0.8)',
        };
      default:
        return {
          backgroundColor: 'rgba(211, 211, 211, 0.4)',
        };
    }
  };

  const priorityStyles = getPriorityStyles(bill.priority);

  return (
    <View style={styles.billItem}>
      <View style={[styles.dateBox, styles.dateBoxOneBill]}>
        <Text style={styles.dateText}>{new Date(bill.dueDate).getDate()}</Text>
        <Text style={styles.dateMonth}>{new Date(bill.dueDate).toLocaleString('default', { month: 'short' })}</Text>
      </View>
      <View style={styles.billsContainer}>
          <View style={styles.billDetailsContainer}>
              <View style={styles.billInfoBox}>
                <Text style={styles.billTitle}>{bill.name}</Text>
                <View style={[styles.billStatus, { backgroundColor: priorityStyles.backgroundColor }]}>
                    <Text style={styles.billStatusText}>{bill.priority}</Text>
                </View>
              </View>
            <View style={styles.billCost}>
              <Text style={styles.amountBillCost}>{bill.amount}€</Text>
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
    width: 72,
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
    backgroundColor: '#F7F6F0'
  },
  billsContainer: {
    flexDirection: 'column',
    gap: 12,
    width: '75%'
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
    wordWrap: 'break-word'
  },
  billStatus: {
    borderRadius: 4,
    paddingVertical: 4,
    alignItems: 'center',
    paddingLeft: 4, 
    paddingRight: 4,
    width: '70%',
  },
  billStatusText: {
    color: '#352D26',
    fontSize: 13.33,
    fontFamily: 'Rebond-Grotesque-Medium',
    fontWeight: '500',
    wordWrap: 'break-word',
  },
  billCost: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
