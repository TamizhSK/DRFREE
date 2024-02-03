import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState, TouchableOpacity, Image } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import { UserType } from "..";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../chatapp/components/User";
import { AuthContext } from "../../context/AuthContext";
import {BASEURL} from '@env';
import { Asset } from 'expo-asset';

const DocHomeScreen =  () => {

  const navigation = useNavigation() ;

  
  const [refresh, setRefresh] = useState(false);
  const [UserId, setUserId] = useState("");
  const [users, setUsers] = useState([{}]);
  const fetchData = async () => {
    const user = await JSON.parse(await AsyncStorage.getItem('user'));
    const usertype = await JSON.parse(await AsyncStorage.getItem('userType'));

    setRefresh(true);
    
    // console.log("refresh", user);
    const userId = user._id;
    console.log('fetchuser-doc',user);
    setUserId(userId);
    // console.log(`${BASEURL}/users/${userId}`);
    await axios.get(`${BASEURL}/${usertype}s/${userId}`)
      .then((response) => {
        console.log('res', response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("error retrieving users", error);
      });
      setRefresh(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  // fetchUsers();
  // console.log("users", user);

  return (
    <ScrollView style={{paddingTop: 30}}
    refreshControl={<RefreshControl refreshing={refresh} onRefresh={()=>fetchData()}/>}>
      {/* <View style={styles.topNavbar}>
          <Text style={styles.logo}>DR Free</Text>
          <View style={styles.userContainer}>
          <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate('Friends')}
          >
            <Text style={styles.createPostButtonText}>+</Text>
          </TouchableOpacity>
            <TouchableOpacity
          onPress={() => navigation.navigate('Friends')}
          >
          {/* <Text style={styles.userName}>{user.username}</Text> 
          </TouchableOpacity>
        </View>
      </View> */}
    {/* </View>
    <View> */}
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
    <View style={{ padding: 30 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};




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

export default DocHomeScreen;