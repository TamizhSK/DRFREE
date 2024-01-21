// screens/CommunityDetail.js
import React from 'react';
import { View, Text } from 'react-native';

const CommunityDetail = ({ route }) => {
  const { community } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{community.name}</Text>
      <Text>Events: {community.events.join(', ')}</Text>
      <Text>Posts: {community.posts.join(', ')}</Text>
      <Text>Contact: {community.contact}</Text>
    </View>
  );
};

export default CommunityDetail;
