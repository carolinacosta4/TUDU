import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { RootStackParamList } from '@/types/navigation'; 
import SearchAndCategories from '@/components/SearchAndCategories';
import { useTips } from '@/hooks/useTips';
import { formatDistanceToNow } from 'date-fns';
import TipItemList from '@/components/TipItemList';
import { getCategoryById } from '@/api/tipsCategory';
import RecentTips from '@/components/RecentTips';
import useFonts from "@/hooks/useFonts";
import SvgUri from 'react-native-svg-uri';
import { useRouter } from 'expo-router';

const TipsPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tips, loading, error } = useTips();
  const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); 
  const [searchText, setSearchText] = useState<string>('');
  const fontsLoaded = useFonts();
  const router = useRouter();

  useEffect(() => {
    const fetchCategoryNames = async () => {
      const categoryNameMap: { [key: string]: string } = {}; 
      for (let tip of tips) {
        try {
          const category = await getCategoryById({ _id: tip.IDcategory });
          //console.log('category:', category);
          categoryNameMap[tip._id] = category.data; 
        } catch (error) {
          console.error(`Error fetching category for tip ${tip._id}:`, error);
        }
      }
      setCategoryNames(categoryNameMap);
    };

    if (tips.length > 0) {
      fetchCategoryNames();
    }
  }, [tips]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#F7F6F0',
      },
      headerTintColor: '#291752',
      headerShadowVisible: false, 
      headerTitle: "Tips",
      headerTitleStyle: {
        fontFamily: "Rebond-Grotesque-Medium",
        fontSize: 23, 
        color: '#291752', 
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('tips/favorites')}>
        <SvgUri
              width="24"
              height="24"
              source={require('@/assets/icons/heart.svg')}
            />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <SvgUri
              width="16"
              height="16"
              source={require('@/assets/icons/back.svg')}
            />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  const handleNavigateToTip = (tipId: string) => {
      router.push(`/tips/${tipId}`);
  };
  
  

  const filteredTips = tips.filter(tip => {
    const categoryMatch =
      selectedCategory === 'All' || tip.IDcategory === selectedCategory; 
    const titleMatch = tip.title.toLowerCase().includes(searchText.toLowerCase());
    return categoryMatch && titleMatch;
  });
  

  const formatRelativeTime = (date: Date) => {
    let relativeTime = formatDistanceToNow(date, { addSuffix: true });
    return relativeTime.replace(/^about\s/, '');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading tips...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }
  if (!fontsLoaded) {
    return <Text>Loading tips...</Text>;
  }

  const recentTips = filteredTips
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SearchAndCategories
        selectedCategory={selectedCategory}
        onCategoryClick={(categoryId) => setSelectedCategory(categoryId)}
        onSearchChange={setSearchText}
      />
      
      <View style={styles.popularContainer}>
        {selectedCategory === 'All' && !searchText && (
          <RecentTips 
            recentTips={recentTips} 
            handleNavigateToTip={handleNavigateToTip} 
          />
        )}
        
        <TipItemList 
          filteredTips={filteredTips} 
          categoryNames={categoryNames} 
          formatRelativeTime={formatRelativeTime} 
          handleNavigateToTip={handleNavigateToTip}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F0',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, 
  },
  popularContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  card: {
    flexDirection: 'column',
    gap: 12,
  },
  cardTitle: {
    color: '#291752',
    fontSize: 23.04,
    fontWeight: '500',
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 10,
  },
});

export default TipsPage;
