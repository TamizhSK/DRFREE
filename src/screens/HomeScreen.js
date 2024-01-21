// screens/HomeScreen.js
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';

const HomeScreen = ({ navigation }) => {
  const posts = [
    { id: 1, user: { name: 'John Doe', photoUrl: Asset.fromModule(require('../../assets/profile.jpeg')).uri }, content: 'Post 1', imageUrl:Asset.fromModule(require('../../assets/post1.jpeg')).uri, caption: 'Promoting a drug-free lifestyle.' },
    { id: 2, user: { name: 'Jane Smirithy', photoUrl: Asset.fromModule(require('../../assets/profile2.jpeg')).uri  }, content: 'Post 2', imageUrl: Asset.fromModule(require('../../assets/post3.jpeg')).uri, caption: 'Choose a healthy and drug-free life.' },
    { id: 3, user: { name: 'Bob Johnson', photoUrl: Asset.fromModule(require('../../assets/profile4.jpeg')).uri  }, content: 'Post 3', imageUrl:Asset.fromModule(require('../../assets/post2.jpeg')).uri, caption: 'Join the movement for a drug-free society.' },
    // Add more posts
    { id: 4, user: { name: 'Alice Williams', photoUrl:Asset.fromModule(require('../../assets/profile3.jpeg')).uri  }, content: 'Post 4', imageUrl: Asset.fromModule(require('../../assets/post4.jpeg')).uri, caption: 'Say no to drugs!' },
    { id: 5, user: { name: 'Charlie Davis', photoUrl:Asset.fromModule(require('../../assets/profile5.jpeg')).uri }, content: 'Post 5', imageUrl: Asset.fromModule(require('../../assets/post5.jpeg')).uri, caption: 'Living a drug-free lifestyle.' },
  ];

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.topNavbar}>
        <Text style={styles.logo}>DR Free</Text>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
          <Text style={styles.userName}>John Doe</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Text style={styles.createPostButtonText}>Create Post</Text>
        </TouchableOpacity>

        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.postContainer}
            onPress={() => navigation.navigate('PostDetail', { post })}
          >
            {/* User details */}
            <View style={styles.postUserContainer}>
              <Image source={{ uri: post.user.photoUrl }} style={styles.postUserPhoto} />
              <Text style={styles.postUserName}>{post.user.name}</Text>
              <Image
                  source={require('../../assets/verification.png')} // Adjust the path based on your project structure
                  style={styles.verificationIcon}
              />
            </View>

            {/* Post content */}
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            <Text style={styles.postCaption}>{post.caption}</Text>
            <View style={styles.footer}>
              <Text style={styles.likeComment}>Like</Text>
              <Text style={styles.likeComment}>Comment</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff', // Use a color that represents a drug-free theme
    margin: 10,
    paddingTop:0,
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
  scrollContainer: {
    flex: 1,
  },
  createPostButton: {
    backgroundColor: '#E16721CC',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    margin: 10,
    borderTopWidth: 0,
  },
  createPostButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    margin: 7,
    backgroundColor : '#CBC5C8CC',
  },
  postUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  verificationIcon: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
    marginLeft: 5, // Adjust the margin as needed
  },
  postUserPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 15,
    fontSize: 16,
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeComment: {
    color: '#007bff',
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
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
export default HomeScreen;


HomeScreen.navigationOptions = {
  headerMode:"none",
};