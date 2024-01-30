import {View, ScrollView, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { OpenAI } from "openai";
import BottomNavbar from '../components/BottomNavbar';
import { Asset } from 'expo-asset';
const ChatBot = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const CHATGPT_API_KEY = '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';
  const openai = new OpenAI({ apiKey: CHATGPT_API_KEY });
  
  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
      const messageText = userMessage.text.toLowerCase();
      const keywords = [""];
      if (!keywords.some(keyword => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I'm your friend, feel free to ask me anything. I am here to help",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'drug Awarness Bot'
          }
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        return;
      }

      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: messageText }],
        model: "gpt-3.5-turbo",
      });

    const recipe = response.choices[0].message.content.toString();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: recipe,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Food Bot'
        }
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.topNavbar}>
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.back}>
          <Text style={styles.backButton}>{'◀︎'}</Text>
          <Text style={styles.logo}>Chatbot</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image
            source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }}
            style={styles.userPhoto}
          />
        </View>
      </View>
        <GiftedChat
          messages={messages}
          onSend={newMessages => handleSend(newMessages)}
          user={{ _id: 1 }}
        />
        <View style={{paddingBottom:38,borderTopWidth: 1,}}></View>
        {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff', // Use a color that represents a drug-free theme
    margin: 10,
    paddingTop:0,
    marginBottom:0,
  },
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 35,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 28,
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
  back:{
    flexDirection: 'row',
  alignItems: 'center',
  },
  backButton:{
    fontSize: 25,
    paddingBottom: 5,
  },
});
export default ChatBot;