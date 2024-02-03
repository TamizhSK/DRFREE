import React from 'react';
<<<<<<< Updated upstream
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image , Linking} from 'react-native';
import { useState , useEffect} from 'react';
=======
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
>>>>>>> Stashed changes
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';
import axios from 'axios';
import {BASEURL} from '@env';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommunityScreen = ({navigation}) => {
  
  const navigate = useNavigation();
    // Sample data for communities
    const [events, setEvents] = useState([]);
    const [usertype, setUsertype] = useState('user');
    const [user, setUser] = useState({username:""});
    useEffect(() => {
      const fetchData = async () => {
        try {
          setUsertype(await JSON.parse(await AsyncStorage.getItem('userType')));
          setUser(await JSON.parse(await AsyncStorage.getItem('user')));
          console.log(BASEURL);
          const response = await axios.get(BASEURL + '/api/comp/compost');
          console.log(response.data);
          setEvents(response.data); // Assuming the response contains the data you want to set
        } catch (error) {
          console.error("Error Fetching Dataa", error);
        }
      };
    
      fetchData();
    }, []);
  
    return (
<<<<<<< Updated upstream
      <View style={styles.container}>
=======
      <SafeAreaView style = {styles.container}>
        <View style={styles.container}>
          {/* Top Navbar */}
>>>>>>> Stashed changes
      <View style={styles.topNavbar}>
      <Text style={styles.logo}>Community</Text>
      <View style={styles.userContainer}>
        {usertype==='com' && <View >
        <TouchableOpacity style = {{backgroundColor : "grey" , borderRadius : 30 , padding : 5 , marginRight : 22 }} onPress={() => navigation.navigate('compost')} >
        <Text style={{fontSize : 20}}>+</Text>
          </TouchableOpacity>
        </View>}

        <Image onPress={()=> navigation.navigate('ProfileScreen')} source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
        <Text style={styles.userName} onPress={()=> navigation.navigate('ProfileScreen')}>{user?.username}</Text>
      </View>
    </View>
        <ScrollView style={styles.scrollContainer}>
          {events.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={styles.communityCard}
              onPress={() => Linking.openURL(event.reg_link)}
            >
              <View>
                <Text style={styles.communityName}>{event.event_Name}</Text>
                <Image source={{ uri: `data:image/jpeg;base64,${event.event_Poster}`}} style={styles.eventImage} />
                <View style={{display : "flex" , flexDirection : "row" , justifyContent : "space-between"}} >
                    <Text>{event.event_Name}</Text>
                    <Text>{event.event_description}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{ padding: 12, borderRadius: 10, backgroundColor: 'red' }}
                onPress={() => Linking.openURL(event.reg_link)}
              >
                <Text style={{ color: 'white' , textAlign : "center"}}>Register</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      </SafeAreaView>
    );
          }
    
  
const styles = StyleSheet.create({
  eventImage: {
    width: 330,
    height: 300,
  },

  container: {
    flex: 1,
    backgroundColor: 'fff', // Use a color that represents a drug-free theme
<<<<<<< Updated upstream
    margin: 10,
    paddingTop:10,
=======
>>>>>>> Stashed changes
    paddingTop:0,
    marginBottom:0,
  },
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 43,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000', // White color for the logo text
  },
  createPostButton: {
    padding: 13, backgroundColor: "#e28743", borderRadius: 90, marginRight: 10, height: 40, 
  },
  createPostButtonText: {
    color: "white", textAlign: "center", fontWeight: "bold", alignSelf: "center", marginTop: 0, fontSize: 15,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // White color for the username text
  },
  back:{
    flexDirection: 'row',
  alignItems: 'center',
  },
  backButton:{
    fontSize: 25,
    paddingBottom: 5,
  },
  pad:{
    paddingBottom: 35,
  },
  scrollContainer: {
    flex: 1,
    margin: 7,
  },
  communityCard: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#CBC5C8CC',
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  eventContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  postContainer: {
    marginBottom: 20,
  },
  parallelImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parallelImage: {
    width: '48%', // Adjust as needed
    height: 150, // Adjust as needed
    marginBottom: 10,
    borderRadius: 10,
  },
  eventText: {
    flex: 1,
    marginLeft: 10,
  },
  postText: {
    flex: 1,
    marginLeft: 10,
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingBottom: 15,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemText: {
    marginLeft: 15,
  },
});

export default CommunityScreen