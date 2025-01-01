import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useTipCategories } from '@/hooks/useCategoryTip';
//import { SearchAndCategoriesProps } from '@/types/searchAndCategoriesProps';
import  SvgUri  from 'react-native-svg';
import { Asset } from 'expo-asset';

interface SearchAndCategoriesProps {
  selectedCategory: string; 
  onCategoryClick: (categoryId: string) => void;  
  onSearchChange: (text: string) => void;  
}


const SearchAndCategories: React.FC<SearchAndCategoriesProps> = ({ selectedCategory, onCategoryClick, onSearchChange }) => {

  const handleSearchChange = (text: string) => {
    onSearchChange(text);
  }

  console.log('selectedCategory:', selectedCategory);

 const {tipCategories, loading, error} = useTipCategories();
 console.log('tipCategories:', tipCategories);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.searchBox}>
          <View style={styles.searchContent}>
            <View  />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        onChangeText={handleSearchChange}
                      />
          </View>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.categoriesContainer}>
      {tipCategories.map((category, index) => (
        <View
          key={index}
          style={[
            styles.categoryBox,
            {
              backgroundColor: selectedCategory === category._id
                ? '#291752'
                : '#EEEADF',
            },
          ]}
        >
          <TouchableOpacity onPress={() => onCategoryClick(category._id)}>
            <Text
              style={[
                styles.categoryText,
                {
                  color: selectedCategory === category._id
                    ? '#EEEADF' 
                    : '#291752',
                },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      </View>   
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    marginBottom: 0,
    backgroundColor: '#F7F6F0',
  },
  searchBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F7F6F0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C4BFB5',
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    color: '#C4BFB5',
    fontSize: 16,
    fontFamily: 'Rebond-Grotesque-Medium',
    fontWeight: '400',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  categoryBox: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'Rebond-Grotesque-Medium',
    fontWeight: '500',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchAndCategories;
