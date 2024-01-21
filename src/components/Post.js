// components/Post.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = ({ post }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{post.username}</Text>
      <Text>{post.message}</Text>
      <View style={styles.footer}>
        <Text style={styles.likeComment}>Like</Text>
        <Text style={styles.likeComment}>Comment</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeComment: {
    color: '#007bff',
  },
});

export default Post;
