// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import StoryScreen from '../screens/StoryScreen';
import StoryDetail from '../screens/StoryDetail';
import HelpDeskScreen from '../screens/HelpDeskScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CreatePost from '../components/CreatePost';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Set the default header to null
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Story" component={StoryScreen} />
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="HelpDesk" component={HelpDeskScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        {/* Add screens for other routes like 'CreatePost', 'PostDetail', etc. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
