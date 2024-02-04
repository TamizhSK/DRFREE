// components/CreatePost.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as ImagePicker from 'expo-image-picker'; // Import the image picker library
import BottomNavbar from '../components/BottomNavbar';
import {BASEURL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';


const CreatePost = ({ navigation }) => {
  const [caption, setCaption] = useState('');
  const [fileAttachment, setFileAttachment] = useState(null);
  const [userdata, setuserdata] = useState(useContext(AuthContext).user);
  // console.log(fileAttachment);
  // const {user} = useContext(AuthContext);
  const baseUrl = BASEURL;
  console.log(baseUrl);
  const handleCreatePost = async() => {
    // Implement logic to create a post with the provided caption and fileAttachment
    // You can use API calls, state management, or any other method based on your app's architecture
    // After creating the post, navigate to the HomeScreen or wherever you want
    console.log("create Post");
    const user = await JSON.parse(await AsyncStorage.getItem('user'));
    // setuserdata(user);
    const usertype = await JSON.parse(await AsyncStorage.getItem('userType'));

    if (caption === ""){
      alert ("Please enter caption");
      return;
    } else if (!fileAttachment) {
      alert("Please attach an image!");
      return;
    } else {
      const res = await fetch(baseUrl+"/api/post/posts", {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          caption: caption,
          postImage: fileAttachment,
          userID: user._id,
          username: user.username,
          usertype: usertype,
        })
      });
      // console.log(res);
      console.log(caption);
      const data = await res.json();
      console.log(data);
    }
    
    navigation.navigate('Home');
  };

  const UploadImage = async() => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.3,
        aspect: [1, 1],
        base64: true,
      });
      console.log(res.assets[0].base64);
      setFileAttachment(res.assets[0].base64);
    } catch (error) {
      console.log(error);
    }
  }

  const convertToBase64 = (res) => {
    try {
      var reader = new FileReader();
      reader.readAsDataURL(res.assets[0]);
      reader.onload = () => {
        console.log(reader.result);
        setFileAttachment(reader.result);
      };
      reader.onerror = error => {
        console.log(" reader Error:", error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.topNavbar}>
        <Text style={styles.logo}>DR Free</Text>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
          <Text style={styles.userName}>{userdata.username}</Text>
        </View>
      </View>
      <Text style={styles.title}>Create a #Society-Change here</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your caption"
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />
      {/* File Attachment */}
      <Button title="Attach Image" onPress={UploadImage} style={{borderRadius: 100}}/>
      {fileAttachment && (
        <View>
          <Image source={{uri: `data:image/jpeg;base64,${fileAttachment}`}} style={{ width: 200, height:200 }} />
          <Text>{fileAttachment.fileName}</Text>
        </View>
      )}
      <View style={{height: 10}}/>
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
    borderRadius: 5,
  },
});

export default CreatePost;
