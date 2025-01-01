import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Tip } from '@/types/tips';


interface RecentTipsProps {
  recentTips: Tip[];
  handleNavigateToTip: (tipId: string) => void;
}

const RecentTips: React.FC<RecentTipsProps> = ({ recentTips, handleNavigateToTip }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Most Recent</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
        {recentTips.length > 0 ? (
          recentTips.map((tip) => (
            <View style={styles.cardItem} key={tip._id}>
              <TouchableOpacity onPress={() => handleNavigateToTip(tip._id)}>
              <Image style={styles.cardImage} source={{ uri: tip.image }} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardContentTitle}>{tip.title}</Text>
                  <Text style={styles.cardContentDescription}>{tip.info}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View>
            <Text>No tips available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    gap: 12,
  },
  cardTitle: {
    color: '#291752',
    fontSize: 23.04,
    fontWeight: '800',
    marginBottom: 12,
    fontFamily: "Rebond-Grotesque-Medium",
  },
  cardRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 10,
  },
  cardImage: {
    width: 163,
    height: 120,
    borderRadius: 8,
  },
  cardItem: {
    width: 179,
    padding: 8,
    backgroundColor: '#EEEADF',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardContent: {
    marginTop: 8,
    width: '100%',
  },
  cardContentTitle: {
    color: '#22163D',
    fontSize: 16,
    fontWeight: '500',
    height: 48,
    fontFamily: "Rebond-Grotesque-Medium",
  },
  cardContentDescription: {
    color: '#635C54',
    fontSize: 13.33,
    fontFamily: "Rebond-Grotesque-Regular",
  },
});

export default RecentTips;
