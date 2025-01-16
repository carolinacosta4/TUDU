import TipCategory from '@/interfaces/TipCategory';
import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface SearchAndCategoriesProps {
  selectedCategory: string; 
  onCategoryClick: (categoryId: string) => void;  
  onSearchChange: (text: string) => void;  
  tipCategories: TipCategory[]
}

const SearchAndCategories = ({ selectedCategory, onCategoryClick, onSearchChange, tipCategories }: SearchAndCategoriesProps) => {

  const handleSearchChange = (text: string) => {
    onSearchChange(text);
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.searchBox}>
          <View style={styles.searchContent}>
            <Icon name="magnify" size={20} color='#C4BFB5' />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={'#C4BFB5'}
              onChangeText={handleSearchChange}
              />
          </View>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.categoriesContainer}>
      {tipCategories.map((category, index) => (
        <Fragment key={index}>
          <TouchableOpacity onPress={() => onCategoryClick(category._id)} style={[
            styles.categoryBox,
            {
              backgroundColor: selectedCategory === category._id
                ? '#291752'
                : '#EEEADF',
            },
          ]}>
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
        </Fragment>
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
    paddingVertical: 10,
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
    marginLeft: 8,
    fontFamily: 'Rebond-Grotesque-Regular',
    color: '#635C54',
  },
});

export default SearchAndCategories;
