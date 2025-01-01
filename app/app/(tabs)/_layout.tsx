import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites', 
          headerStyle: {
            backgroundColor: '#F7F6F0',
          },
          headerTintColor: '#291752',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: 'semibold',
            fontSize: 23,
          },
        }}
      />
    </Tabs>
  );
}