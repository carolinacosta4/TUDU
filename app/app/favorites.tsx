import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation'; 

const ContentCard: React.FC<{
  category: string;
  title: string;
  details: string;
  timestamp: string;
  author: string;
  imageUri: string;
}> = ({ category, title, details, timestamp, author, imageUri }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.categoryText}>{category}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.detailsText}>{`${timestamp} • ${author}`}</Text>
        </View>
      </View>
      <Image style={styles.cardImage} source={{ uri: imageUri }} />
    </View>
  );
};

const Favorites = () => {
  const [tips, useTips] = useState([0]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#F7F6F0',
      },
      headerTintColor: '#291752',
      headerShadowVisible: false,
      headerTitleStyle: {
        fontWeight: 'semibold',
        fontSize: 23,
      },
      headerTitle: "Favorites",
    });
  }, [navigation]);

  return (
 <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
       {tips.length > 4 ? (
      <View style={styles.popularContainer}>
        <ContentCard
          category="Lifestyle"
          title="Simple Ways to Boost Your Morning Routine"
          details="20 minutes ago • Alberta Fernandes"
          timestamp="20 minutes ago"
          author="Alberta Fernandes"
          imageUri="https://via.placeholder.com/90x72"
        />
        <ContentCard
          category="Lifestyle"
          title="How to Make your Home Feel Like a Sanctuary"
          details="4 days ago • João Augusto"
          timestamp="4 days ago"
          author="João Augusto"
          imageUri="https://via.placeholder.com/90x72"
        />
        </View>
        ) : (
          <View style={styles.containerImage}>
            <View>
            </View>
            <View style={styles.textContainer}>
              <View style={styles.textWrapper}>
                <Text style={styles.title}>Nothing here yet!</Text>
                <Text style={styles.subtitle}>Start exploring and save tips that inspire you!</Text>
              </View>
            </View>
        </View>
        )}

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F0',
  },
  contentContainer: {
    padding: 16,
  },
  popularContainer: {
    marginTop: 0,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE5F5',
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  categoryText: {
    color: '#562CAF',
    fontSize: 13,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '500',
    lineHeight: 16,
  },
  detailsContainer: {
    marginTop: 4,
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',      
    height: 664,
    backgroundColor: '#F7F6F0',
  },
  titleText: {
    color: '#22163D',
    fontSize: 16,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '500',
    lineHeight: 20,
  },
  detailsText: {
    color: '#A5A096',
    fontSize: 13,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
  },
  cardImage: {
    width: 142,
    height: 156,
    borderRadius: 4,
  },
  image: {
    width: 175.3,
    height: 190,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
  },
  textWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    width: 186,
    textAlign: 'center',
    color: '#352D26',
    fontSize: 23.04,
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    lineHeight: 34.56,
    wordWrap: 'break-word',
  },
  subtitle: {
    width: 274,
    textAlign: 'center',
    color: '#A5A096',
    fontSize: 16,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
    wordWrap: 'break-word',
  },
});

export default Favorites;
