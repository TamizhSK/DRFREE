// components/CreatePost.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';
const CreatePost = ({ navigation }) => {
  const [caption, setCaption] = useState('');
  const [fileAttachment, setFileAttachment] = useState(null); // You can use a file picker library for this

  const handleCreatePost = () => {
    // Implement logic to create a post with the provided caption and fileAttachment
    // You can use API calls, state management, or any other method based on your app's architecture
    // After creating the post, navigate to the HomeScreen or wherever you want
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
        {/* Top Navbar */}
      <View style={styles.topNavbar}>
        <Text style={styles.logo}>DR Free</Text>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
          <Text style={styles.userName}>Dhejan</Text>
        </View>
      </View>
      <Text style={styles.title}>Create a #Society-Change here</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your caption"
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />
      {/* Implement file attachment functionality here */}
      {/* You can use a library like react-native-document-picker for file selection */}
      {/* Display the selected file name or details */}
      <Button title="Attach File" onPress={() => {/* Handle file attachment */}} />
      <Text>{fileAttachment ? fileAttachment.name : 'No file selected'}</Text>
      <Button title="Post" onPress={handleCreatePost} />
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius:5,
  },
  bottomNavbar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
    elevation: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemText: {
    marginLeft: 15,
  },
  postCaption: {
    padding: 15,
    fontSize: 14,
    color: '#555', // Dark Gray
  },
});

export default CreatePost;
