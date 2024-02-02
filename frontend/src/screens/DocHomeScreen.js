import { StyleSheet, Text, View } from "react-native";
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

  
  // const { user } = useContext(AuthContext);
  
  const [UserId, setUserId] = useState("");
  const [users, setUsers] = useState([{}]);


  // console.log("users", user);

  return (
    <View style={{paddingTop: 30}}>
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
    </View>
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