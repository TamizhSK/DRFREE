// screens/PostDetailScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View>
      <Text>Type: {post.type}</Text>
      <Text>Content: {post.content}</Text>
      {/* Add more details based on post type */}
    </View>
  );
};

export default PostDetailScreen;
