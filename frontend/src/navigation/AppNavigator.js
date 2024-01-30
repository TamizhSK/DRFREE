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
import AiChatbot from '../screens/Chatbot';
import EducationOfDrug from '../screens/EducationOfDrug';
import Addversedrug from '../screens/Addversedrug';
import LegalConsequencesPage from '../screens/legalConsquence';
import HelpLine from '../screens/HelpLine';
import EduHelp from '../screens/EduHelp';
import RehabCenter from '../screens/RehabCenter';
import Activate from '../screens/Activate';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';
import CreateStory from '../components/CreateStory';
import LoginScreen from '../screens/Login';


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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Story" component={StoryScreen} />
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="HelpDesk" component={HelpDeskScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="AiChatbot" component={AiChatbot} />
        <Stack.Screen name="EducationOfDrug" component={EducationOfDrug} />
        <Stack.Screen name="Addversedrug" component={Addversedrug} />
        <Stack.Screen name="LegalConsequencesPage" component={LegalConsequencesPage} />
        <Stack.Screen name="HelpLine" component={HelpLine} />
        <Stack.Screen name="EduHelp" component={EduHelp}/>
        <Stack.Screen name="RehabCenter" component={RehabCenter} />
        <Stack.Screen name="Activate" component={Activate} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
        <Stack.Screen name='CreateStory' component={CreateStory}/>

        {/* Add screens for other routes like 'CreatePost', 'PostDetail', etc. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
