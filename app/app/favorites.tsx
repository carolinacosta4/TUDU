import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useUser } from '@/hooks/useUser';
import TipItemList from '@/components/TipItemList';
import useFonts from "@/hooks/useFonts";
import { formatDistanceToNow } from 'date-fns';
import Tip from '@/interfaces/Tip';
import LoadingScreen from '@/components/LoadingScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HeaderItem from '@/components/Header';

const Favorites = () => {
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const {user} = useUser();
  const fontsLoaded = useFonts();

  useEffect(() => {
    if(user) setFilteredTips(user.FavoriteTip.map(tip => tip.IDtip))
  }, [user]);

    const formatRelativeTime = (date: Date) => {
      let relativeTime = formatDistanceToNow(date, { addSuffix: true });
      return relativeTime.replace(/^about\s/, '');
    };
  
    if (!fontsLoaded || !user) {
      return <LoadingScreen/>
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20, }}>
          <View style={{ width: 28 }}>
            <HeaderItem page="Favorites" />
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
              Favorites
            </Text>
          </View>
        </View>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {filteredTips.length > 0 ? (
        <View style={styles.popularContainer}>
          <TipItemList
            filteredTips={filteredTips}
            formatRelativeTime={formatRelativeTime} 
          />
        </View>
      ) : (
        <View style={styles.containerImage}>
          <View style={styles.textContainer}>
          <View style={styles.textWrapper}> 
                <Image 
                  source={{ uri: 'https://res.cloudinary.com/ditdnslga/image/upload/v1734716115/r0wwfbnf1g4qme1vcexn.png' }}
                  style={styles.mascotImage}
                />
              <Text style={styles.title}>Nothing here yet!</Text>
              <Text style={styles.subtitle}>Start exploring and save tips that inspire you!</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
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
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 664,
    backgroundColor: '#F7F6F0',
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
  },
  subtitle: {
    width: 274,
    textAlign: 'center',
    color: '#A5A096',
    fontSize: 16,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
  },
  mascotImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Favorites;
