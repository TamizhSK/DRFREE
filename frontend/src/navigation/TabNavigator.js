import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StoryScreen from '../screens/StoryScreen';
import HelpDeskScreen from '../screens/HelpDeskScreen';
import Activate from '../screens/Activate';
import { Entypo, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import HomeScreenNavigation from './HomeScreenNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Optional: align items to center vertically
        backgroundColor: 'white', // Customize the background color if needed
        paddingVertical: 10, // Optional: adjust vertical padding
        paddingHorizontal: 20, // Optional: adjust horizontal padding
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Story"
        component={StoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book-reader" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HelpDesk"
        component={HelpDeskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activate"
        component={Activate}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
