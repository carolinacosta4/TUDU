import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import SearchAndCategories from '@/components/SearchAndCategories';
import { formatDistanceToNow } from 'date-fns';
import TipItemList from '@/components/TipItemList';
import RecentTips from '@/components/RecentTips';
import useFonts from "@/hooks/useFonts";
import { useTips } from '@/hooks/useTips';
import Tip from '@/interfaces/Tip';
import { useTipCategories } from '@/hooks/useCategoryTip';
import LoadingScreen from '@/components/LoadingScreen';
import HeaderItem from '@/components/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TipsPage() {
  const { tips, error } = useTips()
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); 
  const [searchText, setSearchText] = useState<string>('');
  const fontsLoaded = useFonts();
  const [filteredTips, setFilteredTips] = useState<Tip[]>([])
  const [recentTips, setRecentTips] = useState<Tip[]>([])
  const { fetchTipCategories, tipCategories } = useTipCategories();  

  useEffect(() => {
    fetchTipCategories()
  }, [])

  useEffect(() => {
    if (!tips) {
      return;
    }
    
    const filteredTipsFilter = tips.filter(tip => {
      const categoryMatch =
        selectedCategory === 'All' || tip.IDcategory._id === selectedCategory;
      const titleMatch = tip.title.toLowerCase().includes(searchText.toLowerCase());
      return categoryMatch && titleMatch;
    });
    setFilteredTips(filteredTipsFilter);

    const recentTipsSort = tips
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    setRecentTips(recentTipsSort);
  }, [tips, selectedCategory, searchText]);

  const formatRelativeTime = (date: Date) => {
    let relativeTime = formatDistanceToNow(date, { addSuffix: true });
    return relativeTime.replace(/^about\s/, '');
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!fontsLoaded || !tipCategories || !tips) {
    return <LoadingScreen/>
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: '#F7F6F0' }}>
        <View style={{ padding: 20, }}>
          <HeaderItem page="Tips" />   
        </View>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SearchAndCategories
        tipCategories={tipCategories}
        selectedCategory={selectedCategory}
        onCategoryClick={(categoryId) => setSelectedCategory(categoryId)}
        onSearchChange={setSearchText}
      />
      <View style={styles.popularContainer}>
        {selectedCategory === 'All' && !searchText && (
          <RecentTips 
            recentTips={recentTips} 
          />
        )}
        
        <TipItemList 
          filteredTips={filteredTips} 
          formatRelativeTime={formatRelativeTime} 
        />
      </View>
    </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6F0',
  },
  contentContainer: {
    paddingHorizontal: 20,
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
