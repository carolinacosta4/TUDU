import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Bill from "@/interfaces/Bill";
import { getLeftActivationDays } from '@/utils/relativeTime';

const HeaderBillPage = ({
    progress,
    pendingBill, 
    activeBillsCount,
    nextPayment,
    monthsTotal
  }: {
    progress: number;
    pendingBill: Bill | null;
    activeBillsCount: number; 
    nextPayment: Bill | null;
    monthsTotal: number
  }) => {
    const dueInText = nextPayment?.dueDate ? getLeftActivationDays(new Date(nextPayment.dueDate)) : '';

  return (
    <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentTitle}>Monthly payments</Text>
        <View style={styles.stats}>
          <Text style={styles.percentage}>{progress}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.billInfo}>  {progress >= 100
                ? "All bills paid!"
                : `${activeBillsCount} Active bills left`} </Text>
        </View>
      </View>
      <View style={styles.pendingCard}>
        <Text style={styles.status}>Pending</Text>
        {pendingBill ? (
            <View style={styles.billDetails}>
              <Text style={styles.amountPendingCard}>
                {pendingBill.amount}{pendingBill.IDcurrency.symbol}
              </Text>
              <Text style={styles.billType}>{pendingBill.name}</Text>
            </View>
          ) : activeBillsCount === 0 ? (
            <Text style={styles.amountPendingCard}>All clear!</Text>
          ) : (
            <Text style={styles.amountPendingCard}>All Bills</Text>
          )}
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.nextPayment}>
        <Text style={styles.nextPaymentTitle}>Next Payment</Text>
        <View style={styles.paymentDetails}>
        {nextPayment ? (
             <Text style={styles.amountNextPayment}>{nextPayment.amount}{nextPayment.IDcurrency.symbol}</Text>
        ) : (
            <Text style={styles.amountNextPayment}>All Set!</Text>
        )}
          <Text style={styles.billType}>{nextPayment?.name}</Text>
        </View>
        {nextPayment ? (
            <Text style={styles.paymentDue}>in {dueInText} days</Text>
        ) : (
            <Text style={styles.amountNextPayment}></Text>
        )}
      </View>
      <View style={styles.totalCard}>
        <View style={styles.backgroundCard} />
        <Text style={styles.monthTitle}>Month’s total</Text>
        <Text style={styles.totalAmount}>{monthsTotal}</Text>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
    card: {
        paddingLeft: 16,
        paddingRight: 16,
        height: 256,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
      },
      paymentInfo: {
        paddingTop: 12,
        height: 124,
        paddingBottom: 7,
        paddingLeft: 8,
        paddingRight: 8,
        width: Dimensions.get("window").width * 0.55,
        backgroundColor: '#FBD160',
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        gap: 4,
      },
      paymentTitle: {
        color: '#303030',
        fontSize: 13.33,
        fontFamily: 'ES Rebond Grotesque TRIAL',
        fontWeight: '400',
        lineHeight: 16,
      },
      stats: {
        width: '100%',
        height: 85,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      percentage: {
        color: '#303030',
        fontSize: 23.04,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        lineHeight: 34.56,
      },
      progressBar: {
        width: '100%',
        height: 24,
        backgroundColor: '#EEEADF',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8,
      },
      progressFill: {
        height: 24,
        backgroundColor: '#352D26',
        borderRadius: 50,
      },
      billInfo: {
        color: '#635C54',
        fontSize: 13.33,
        fontFamily: 'ES Rebond Grotesque TRIAL',
        fontWeight: '400',
        lineHeight: 16,
        marginTop: 8,
      },
      pendingCard: {
        width: Dimensions.get("window").width * 0.35,
        height: 124,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#C0C7FB',
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      status: {
        alignSelf: 'stretch',
        color: '#291752',
        fontSize: 13.33,
        fontFamily: 'ES Rebond Grotesque TRIAL',
        fontWeight: '400',
        lineHeight: 16,
      },
      billDetails: {
        height: 47,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8,
      },
      amountNextPayment: {
        alignSelf: 'stretch',
        height: 27,
        color: '#F94D89',
        fontSize: 23.04,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        lineHeight: 34.56,
      },
      amountPendingCard: {
        alignSelf: 'stretch',
        height: 27,
        color: '#562CAF',
        fontSize: 23.04,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        lineHeight: 34.56,
      },
      billType: {
        alignSelf: 'stretch',
        color: '#291752',
        fontSize: 13.3,
        fontFamily: 'ES Rebond Grotesque TRIAL',
        fontWeight: '400',
      },
      nextPayment: {
        width: Dimensions.get("window").width * 0.35,
        height: 124,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'rgba(246, 192, 216, 0.30)',
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      nextPaymentTitle: {
        color: '#F94D89',
        fontSize: 13.33,
        fontFamily: 'ES Rebond Grotesque TRIAL',
        fontWeight: '400',
        lineHeight: 16,
      },
      paymentDetails: {
        alignSelf: 'stretch',
        height: 71,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8,
      },
      paymentDue: {
        alignSelf: 'stretch',
        color: '#635C54',
        fontSize: 13.33,
        fontFamily: 'ES Rebond Grotesque TRIAL',
        fontWeight: '400',
        lineHeight: 16,
      },
      totalCard: {
        width: Dimensions.get("window").width * 0.55,
        height: 124,
        position: 'relative',
      },
      backgroundCard: {
        width: Dimensions.get("window").width * 0.55,
        height: 124,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 12,
        paddingBottom: 12,
        left: 0,
        top: 0,
        position: 'absolute',
        backgroundColor: '#B8DEA4',
        borderRadius: 8,
      },
      monthTitle: {
        left: 8,
        top: 12,
        position: 'absolute',
    
        color: '#474038',
        fontSize: 13.33,
        fontFamily: 'ES Rebond Grotesque TRIAL',
        fontWeight: '400',
        lineHeight: 16,
        flexWrap: 'wrap',
      },
      totalAmount: {
        right: 16,
        bottom: 16,
        position: 'absolute',
        color: '#12BA5B',
        fontSize: 33.18,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        flexWrap: 'wrap',
      },
})

export default HeaderBillPage;
