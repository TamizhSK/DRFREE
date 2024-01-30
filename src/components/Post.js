// components/Post.js
import React from 'react';
import {  View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Post = ({ post }) => {
  return (
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
      <Text style={styles.likeComment}>Repost</Text>
      <Text style={styles.likeComment}>Send</Text>
    </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    justifyContent : "space-around",
    paddingLeft : 20,
    paddingBottom: 10,
    paddingRight : 20,
  },
  likeComment: {
    paddingTop: 3,
    color: '#1c1c1c',
  },
  postCaption: {
    padding: 15,
    fontSize: 14,
    color: '#555', // Dark Gray
    borderBottomColor : "#B4B4B4",
    borderBottomWidth : 0.3,
    borderBottomRightRadius : 4,
  },
});

export default Post;
