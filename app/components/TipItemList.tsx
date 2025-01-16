import React, { Fragment } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import  Tip  from '@/interfaces/Tip';
import { Link } from 'expo-router';

interface TipItemListProps {
  filteredTips: Tip[];
  formatRelativeTime: (date: Date) => string;
}

const TipItemList = ({
  filteredTips,
  formatRelativeTime,
}: TipItemListProps) => {
  return (
      filteredTips.length > 0 ? (
        filteredTips
          .sort((a, b) => {
            const titleA = a.title || ''; 
            const titleB = b.title || ''; 
            return titleA.localeCompare(titleB);
          })
          .map((tip) => (
            <Fragment key={tip._id}>
            <Link href={{pathname: '/tips/[tipId]', params: {tipId: tip._id}}} >
              <View style={styles.footerContainer}>
                <View style={styles.footerItem}>
                  <Text style={styles.footerTitle}>
                   {tip.IDcategory.name}
                  </Text>
                  <View style={styles.footerContent}>
                    <Text style={styles.footerText}>{tip.title}</Text>
                    <Text style={styles.footerMeta}>
                      {formatRelativeTime(new Date(tip.createdAt))} • {tip.author}
                    </Text>
                  </View>
                </View>
                <Image style={styles.footerImage} source={{ uri: tip.image }} />
              </View>
            </Link>
            </Fragment>
          ))
      ) : (
        <Text>No tips available</Text>
      )
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE5F5',
  },
  footerItem: {
    flex: 1,
  },
  footerImage: {
    width: 90,
    height: 72,
    borderRadius: 4,
    marginLeft: 10,
  },
  footerTitle: {
    color: '#562CAF',
    fontSize: 13.33,
    fontFamily: "Rebond-Grotesque-Regular",
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 8,
    wordWrap: 'break-word',
  },
  footerContent: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
  },
  footerText: {
    color: '#22163D',
    fontSize: 16,
    fontFamily: "Rebond-Grotesque-Medium",
    fontWeight: '500',
    lineHeight: 16,
    wordWrap: 'break-word',
    
  },
  footerMeta: {
    color: '#A5A096',
    fontSize: 13.33,
    fontFamily: "Rebond-Grotesque-Regular",
    fontWeight: '400',
    lineHeight: 16,
    wordWrap: 'break-word',
  },
});

export default TipItemList;
