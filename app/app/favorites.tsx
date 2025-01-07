import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import { useUser } from '@/hooks/useUser';
import TipItemList from '@/components/TipItemList';
import { getTip } from '@/api/tips'; 
import { useRouter } from 'expo-router';
import { getCategoryById } from '@/api/tipsCategory';
import useFonts from "@/hooks/useFonts";
import { formatDistanceToNow } from 'date-fns';
import { useMascot } from '@/hooks/useMascot';
const Favorites = () => {
  const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>({});
  const [filteredTips, setFilteredTips] = useState<any[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useUser();
  const router = useRouter();
  const fontsLoaded = useFonts();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sadMascot = useMascot('676968aca5e78f1378a63a6b');
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

  useEffect(() => {

    const fetchFavoriteTips = async () => {
      if (user?.user?.FavoriteTip) {
        const favoriteTipIds = user.user.FavoriteTip.map(fav => fav.IDtip);
        const fetchedTips = await Promise.all(
          favoriteTipIds.map(async (id) => {
            try {
              const tip = await getTip(id); 
              return tip.data; 
            } catch (error) {
              console.error(`Error fetching tip with ID ${id}:`, error);
              return null;
            }
          })
        );

        const validTips = fetchedTips.filter(tip => tip !== null);
        setFilteredTips(validTips);

        const categoryNameMap: { [key: string]: string } = {};
           await Promise.all(
       
          validTips.map(async (tip) => {
            try {
              const category = await getCategoryById({ _id: tip.IDcategory });
             // console.log('category:', category);
              categoryNameMap[tip._id] = category.data;
              //console.log('categoryNameMap:', categoryNameMap);
            } catch (error) {
              console.error(`Error fetching category for tip ${tip._id}:`, error);
            }
          })
        );
        setCategoryNames(categoryNameMap);
      }
    };

    fetchFavoriteTips();
  }, [user]);



  const handleNavigateToTip = (tipId: string) => {
    router.push(`/tips/${tipId}`);
  };

    const formatRelativeTime = (date: Date) => {
      let relativeTime = formatDistanceToNow(date, { addSuffix: true });
      return relativeTime.replace(/^about\s/, '');
    };
  
    if (!fontsLoaded) {
      return <Text>Loading tips...</Text>;
    }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {filteredTips.length > 0 ? (
        <View style={styles.popularContainer}>
          <TipItemList
            filteredTips={filteredTips}
            categoryNames={categoryNames}
            formatRelativeTime={formatRelativeTime} 
            handleNavigateToTip={handleNavigateToTip}
          />
        </View>
      ) : (
        <View style={styles.containerImage}>
          <View style={styles.textContainer}>
          <View style={styles.textWrapper}>
              {sadMascot?.mascot ? (
                <Image 
                  source={{ uri: sadMascot.mascot?.image }}
                  style={styles.mascotImage}
                />
              ) : (
                <Text>Loading mascot...</Text>
              )}
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
