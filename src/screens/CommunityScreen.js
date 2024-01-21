// screens/CommunityScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';
const CommunityScreen = ({ navigation }) => {
    // Sample data for communities
    const communities = [
      {
        id: 1,
        name: 'Phoenix Support Network',
        events: [
          { title: 'Event 1 : Health and Wellness Expo', image: require('../../assets/event1.jpg') },
          { title: 'Event 2 : Recovery Symposium', image: require('../../assets/event2.jpg') },
        ],
        posts: [
          { title: 'Post 1 : Tips for Maintaining a Drug-Free Life', image: require('../../assets/post1.jpg') },
          { title: 'Post 2 : Spotlight: Making a Difference', image: require('../../assets/post2.jpg') },
        ],
        contact: 'PhoenixSN@gmail.com',
      },
      {
        id: 2,
        name: 'United Against Substance Abuse',
        events: [
          { title: 'Event 3 : Community Clean-Up Day', image: require('../../assets/event3.jpg') },
          { title: 'Event 4 : Youth Outreach Campaign', image: require('../../assets/event4.jpg') },
        ],
        posts: [
          { title: 'Post 3 : Stories of Overcoming Addiction', image: require('../../assets/post3.jpg') },
          { title: 'Post 4 : Celebrating One Year of Sobriety!', image: require('../../assets/post4.jpg') },
        ],
        contact: 'UASA@gmail.com',
      },
      // Add more communities
    ];
  
    return (
        <View style={styles.container}>
          {/* Top Navbar */}
      <View style={styles.topNavbar}>
        <Text style={styles.logo}>Community</Text>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
          <Text style={styles.userName}>John Doe</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {communities.map((community) => (
          <TouchableOpacity
            key={community.id}
            style={styles.communityCard}
            onPress={() => navigation.navigate('CommunityDetail', { community })}
          >
            <Text style={styles.communityName}>{community.name}</Text>
            <View>
            <Text style={styles.sectionTitle}>Events</Text>
            <View style={styles.eventContainer}>
              <View style={styles.parallelImagesContainer}>
                {community.events.map((event, index) => (
                    <Image source={event.image} style={styles.parallelImage} />
                ))}
              </View>
            </View>
            {community.events.map((event, index) => (
              <View key={index} style={styles.eventContainer}>
                <View style={styles.eventText}>
                  <Text>{event.title}</Text>
                </View>
              </View>
            ))}


            <Text style={styles.sectionTitle}>Posts</Text>
            <View style={styles.postContainer}>
              <View style={styles.parallelImagesContainer}>
                {community.posts.map((post, index) => (
                  <Image source={post.image} style={styles.parallelImage} />
                  ))}
              </View>
            </View>
            {community.posts.map((post, index) => (
              <View key={index} style={styles.eventContainer}>
              <View style={styles.postText}>
                <Text>{post.title}</Text>
              </View>
            </View>
            ))}
              <Text>Contact: {community.contact}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    padding: 10,
  },
  communityCard: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#CBC5C8CC',
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  eventContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  postContainer: {
    marginBottom: 20,
  },
  parallelImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parallelImage: {
    width: '48%', // Adjust as needed
    height: 150, // Adjust as needed
    marginBottom: 10,
    borderRadius: 10,
  },
  eventText: {
    flex: 1,
    marginLeft: 10,
  },
  postText: {
    flex: 1,
    marginLeft: 10,
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingBottom: 15,
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
});

export default CommunityScreen;
