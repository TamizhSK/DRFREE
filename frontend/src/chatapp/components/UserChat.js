import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { UserType } from "../UserContext";
import {BASEURL} from '@env';

const UserChat = ({ item }) => {
  // const { userId, setUserId } = useContext(UserType);
  const [messages, setMessages] = useState([]);
  const [userdata, setUserdata ] = useState(null);

  const navigation = useNavigation();
  console.log("item", item);
  const fetchMessages = async () => {
    try {
      const user = await JSON.parse(await AsyncStorage.getItem('user'));
      const usertype = await JSON.parse(await AsyncStorage.getItem('userType'));
      const response = await axios.get(
        `${BASEURL}/messages/${user._id}/${item}/${usertype}`
      );
      console.log("hii")
  const res = await axios.get(`${BASEURL}/${(usertype==='user')?'doc':'user'}/${item}`)
      const data = response.data;
      // console.log(res);
      // console.log("data", res.data);
      if (response.status===200 && res.status===200) {
        setMessages(data.messages);
        setUserdata(res.data.recepientId);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  console.log(messages,'efgh');

  const getLastMessage = () => {
    const userMessages = messages.filter(
      (message) => message.messageType === "text"
    );

    const n = userMessages.length;

    return userMessages[n - 1];
  };
  const lastMessage = getLastMessage();
  console.log(lastMessage);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Messages", {
          recepientId: item,
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item?.image }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{userdata?.username}</Text>
        {lastMessage && (
          <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
            {lastMessage?.message}
          </Text>
        )}
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {lastMessage ? formatTime(lastMessage?.timeStamp) : 'No recent messages'}
        </Text>
      </View> 
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});