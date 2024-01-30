import React from 'react';
import { View, Text,Image, StyleSheet, ScrollView } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';

const StoryDetail = ({ route, navigation }) => {
  const { story } = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.topNavbar}>
        <Text style={styles.logo}>Story</Text>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
          <Text style={styles.userName}>John Doe</Text>
        </View>
        </View>
      <ScrollView>
        {/* Display the full title and content of the story */}
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.content}>{story.content}</Text>
      </ScrollView>
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#ddd',
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
  logo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    paddingTop: 15,
  },
  content: {
    fontSize: 18,
    color: '#555',
    lineHeight: 26,
  },
});

export default StoryDetail;
