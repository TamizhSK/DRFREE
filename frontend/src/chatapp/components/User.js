import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {BASEURL} from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const User = ({ item }) => {
  // const { user } = useContext(AuthContext);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [userId, setUserId] = useState("null");
  // console.log('users: ',user);
        // const user = await JSON.parse(await AsyncStorage.getItem('user'));

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const user = await JSON.parse(await AsyncStorage.getItem('user'));
        const usertype = await JSON.parse(await AsyncStorage.getItem('userType'));
        setUserId(user._id);
        const response = await axios.get(
          `${BASEURL}/${usertype}/friend-requests/sent/${user._id}`
        );

        // const data = await JSON.parse(response);
        if (response.status===200) {
          console.log("resp: ",response.data);
          setFriendRequests(response.data);
        } else {
          console.log("error--", response.status);
        } 
      } catch (error) {
        console.log("error---", error);
      }
    };

    fetchFriendRequests();
  }, []);

  useEffect(() => { 
    const fetchUserFriends = async () => {
      try {
        const user = await JSON.parse(await AsyncStorage.getItem('user'));
        const usertype = await JSON.parse(await AsyncStorage.getItem('userType'));
        console.log("userssshhs",user._id);
        const response = await axios.get(`${BASEURL}/${usertype}/accepted-friends/${user._id}`);

        // const data = await response.json();

        if (response.status===200) {
          const data = response.data.acceptedFriends;
          console.log(data);
          setUserFriends(data.map((user)=> user));
        } else {
          console.log("error retrieving user friends", response.status);
        }
      } catch (error) {
        console.log("Error message", error);
      }
    };
 
    fetchUserFriends();
  }, []);
  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const usertype = await JSON.parse(await AsyncStorage.getItem('userType'));
      const user = await JSON.parse(await AsyncStorage.getItem('user'));
      console.log(currentUserId, user._id, selectedUserId, usertype);
      const response = await axios.post(`${BASEURL}/friend-request`, 
      { currentUserId, selectedUserId, usertype: usertype, username: user.username});

      if (response.status===200) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("error message---", error);
    }
  };
  console.log("friend requests sent", friendRequests);
  console.log("user friends", userFriends);
  console.log(userFriends.includes(item));
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        {/* <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        /> */}
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.username}</Text>
        {/* <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text> */}
      </View>     
      {userFriends.includes(item._id) ? (
        <Pressable
          style={{
            backgroundColor: "#82CD47",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
        </Pressable>
      ) : requestSent || friendRequests.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Request Sent
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Friend
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});