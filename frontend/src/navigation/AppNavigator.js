// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import StoryScreen from '../screens/StoryScreen';
import StoryDetail from '../screens/StoryDetail';
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
import HelpDesk from '../screens/HelpDeskScreen';
import WelcomeScreen from '../Auth/WelcomeScreen';
import SignUpScreen from '../Auth/Singup';
import SigninScreen from '../Auth/Signin';
import PasswordReset from '../Auth/PasswordReset';
import DocSignUp from '../Auth/DocSignUp';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{
          headerShown: false,
        }}
      >
      <Stack.Screen name='passreset' component={PasswordReset} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
       <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="DocSignUp" component={DocSignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Story" component={StoryScreen} />
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="HelpDesk" component={HelpDesk} />
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
        <Stack.Screen name="CreateStory" component={CreateStory}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;
