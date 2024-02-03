import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
// import { UserType } from "../UserContext";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FriendRequest from "../components/FriendRequest";
import { AuthContext } from "../../../context/AuthContext";
import {BASEURL} from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
const FriendsScreen = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const { userId, setUserId } = useContext(AuthContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const fetchFriendRequests = async () => {
    const user = await JSON.parse(await AsyncStorage.getItem('user'));
    const usertype = await JSON.parse(await AsyncStorage.getItem('userType'));
    try {
      console.log(user)
      setRefresh(true);
      console.log("usertype", user._id);
      const response = await axios.get(
        `${BASEURL}/${usertype}/friend-request/${user._id}`
      );
      if (response.status === 200) {
        // console.log(response);
        const friendRequestsData = (response?.data)?response.data:[];
        
        setFriendRequests(friendRequestsData);
      }
      setRefresh(false);
    } catch (err) {
      console.log("error message", err);
      setRefresh(false);
    }}


  useEffect(() => {
    fetchFriendRequests();
  }, []);


  console.log("friendRequests", friendRequests);
  return (
    <ScrollView style={{ padding: 10, marginHorizontal: 12, paddingTop:30 }}
    refreshControl={<RefreshControl  refreshing={refresh} onRefresh={()=>fetchFriendRequests()} />}>
      <View style={styles.topNavbar}>
          <Text style={styles.logo}>DR Free</Text>
          <View style={styles.userContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
           <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
           <MaterialIcons
             onPress={() => navigation.navigate("Friends")}
             name="people-outline"
             size={24}
             color="black"
           />
         </View>
         </View>
    </View>
      {friendRequests.length===0 && <Text>No recent Friend Request</Text>}
      {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}
      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}

    </ScrollView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff', // Use a color that represents a drug-free theme
    // margin: 10,
    paddingTop:0,
    marginBottom:0,
  },
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 10,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000', // White color for the logo text
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
});