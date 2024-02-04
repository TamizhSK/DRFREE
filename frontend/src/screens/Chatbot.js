import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity , SafeAreaView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import OpenAI from 'openai';
import BottomNavbar from '../components/BottomNavbar';
import LoadingPage from '../components/LoadingPage';
import { Asset } from 'expo-asset';

const ChatBot = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const CHATGPT_API_KEY = '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';
  const openai = new OpenAI({ apiKey: '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' });

  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages((previousMessages) => GiftedChat.append(previousMessages, userMessage));

      if (showWelcome) {
        // Handle the first visit
        setShowWelcome(false);
        const welcomeMessage = {
          _id: new Date().getTime() + 1,
          text: "Welcome! I'm here to assist you. Feel free to ask me anything.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'ChatBot',
          },
        };
        setMessages((previousMessages) => GiftedChat.append(previousMessages, welcomeMessage));
        return;
      }

      setLoading(true);

      const messageText = userMessage.text.toLowerCase();
      const keywords = [''];

      if (!keywords.some((keyword) => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I'm your friend, feel free to ask me anything. I am here to help",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'ChatBot',
          },
        };
        setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
      } else {
        const response = await openai.chat.completions.create({
          messages: [{ role: 'system', content: messageText }],
          model: 'gpt-3.5-turbo',
        });

        const recipe = response.choices[0].message.content.toString();
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: recipe,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'ChatBot',
          },
        };
        setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      // You might want to display an error message to the user
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optionally, you can add some initialization logic here
  }, []);

  return (
    <SafeAreaView style = {styles.container}>
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
          <Image
            source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }}
            style={styles.userPhoto}
          />
        </View>
      </View>

      {loading && <LoadingPage />}

      {showWelcome && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome! I'm here to assist you.</Text>
          <Text style={styles.welcomeText}>Feel free to ask me anything.</Text>
          <Image
            source={{ uri: Asset.fromModule(require('../../assets/aichatbotwelcome.jpg')).uri }}
            style={{height: 200, width: 200, borderRadius: 100}}
          />
        </View>
      )}

      <GiftedChat messages={messages} onSend={handleSend} user={{ _id: 1 }} />

      <View style={{ paddingBottom: 52, borderTopWidth: 1 }}></View>
      <BottomNavbar navigation={navigation} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
    paddingTop: 0,
    marginBottom: 0,
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
    color: '#000',
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
  welcomeContainer: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 25,
    paddingBottom: 5,
  },
});

export default ChatBot;
