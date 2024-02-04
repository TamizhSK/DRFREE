import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
// import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASEURL} from '@env';
const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const [userdata, setUserdata ] = useState(null);
  const navigation = useNavigation();
  console.log('item',item);
  const acceptRequest = async (friendRequestId) => {
    const user = await JSON.parse(await AsyncStorage.getItem('user'));
    const usertype = await JSON.parse(await AsyncStorage.getItem('userType'))
    try {
      const baseurl = "http://192.168.1.13:6969";
      console.log("friendRequestId", friendRequestId);
      const response = await axios.post(
      `${BASEURL}/friend-request/accept`,
        {   senderId: friendRequestId,
            recepientId: user._id,
            usertype: usertype,
          });
          
      
          console.log("resp---", response.status);
      if (response.status===200) {
        setFriendRequests(
          friendRequests.filter((request) => request._id !== friendRequestId)
        );
        // navigation.navigate("Chats");
      }else{
      }
    } catch (err) {
      console.log("error accepting the friend request", err);
    }
  };
  useEffect(()=>{
    const fetchItemUser = async() => {
      console.log("edcfgvbhjn", item);
      const usertype =  await JSON.parse(await AsyncStorage.getItem('userType')).toLowerCase();
      try{const response = await axios.get(`${BASEURL}/${(usertype==='doc')?'user':'doc'}/${item}`);
      const user = response.data.recepientId;
      console.log("qwertyujk,mnbvcd",user);
      setUserdata(user);
      }catch(error){
        console.log("error===", error);
      }
    } 
    fetchItemUser();
  },[])

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
       {/* <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.image }}
      /> */}

      <Text
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}
      >
        {userdata?.username} sent you a friend request!!
      </Text>

      <Pressable
        onPress={() => acceptRequest(item)}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});