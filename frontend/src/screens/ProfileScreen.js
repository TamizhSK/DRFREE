import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ProgressBarAndroid } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons , } from '@expo/vector-icons'; // Import icons for menu, reels, mentions, and posts
import BottomNavbar from '../components/BottomNavbar';
import { AuthContext } from '../../context/AuthContext';


const ProfileScreen = ({ navigation }) => {
  const {user, logout} = useContext(AuthContext);
  const userData = {
    username: user?.username,
    bio: 'Passionate Developer | 🚀 Coding enthusiast',
    profileImage: (user?.profile)?user?.profile:require('../../assets/profile.jpeg'), // Replace with your user's profile image
    posts: (user?.posts?.length===0)?[
      { id: 1, imageUrl: require('../../assets/post1.jpeg') },
      { id: 2, imageUrl: require('../../assets/post2.jpeg') },
      { id: 3, imageUrl: require('../../assets/post3.jpeg') },
      // Add more posts as needed
      { id: 4, imageUrl: require('../../assets/post4.jpeg') },
      { id: 5, imageUrl: require('../../assets/post5.jpeg') },
      { id: 6, imageUrl: require('../../assets/post1.jpeg') },
      { id: 7, imageUrl: require('../../assets/post2.jpeg') },
      { id: 8, imageUrl: require('../../assets/post3.jpeg') },
      { id: 9, imageUrl: require('../../assets/post4.jpeg') },
    ]:[],
    streakDays: 10, 
  };
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollcontainer}>
        <View style={styles.topNavbar}>
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.back}>
          <Text style={styles.backButton}>{'◀︎'}</Text>
          <Text style={styles.logo}>Back</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
        <TouchableOpacity onPress={() => {logout(); navigation.navigate('Welcome');}}>
          <Text style={{fontWeight:700, fontSize: 15}}>Logout</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image source={userData.profileImage} style={styles.profileImage} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userData?.username}</Text>
          <Text style={styles.bio}>{userData?.bio}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuIcon}>
            <MaterialCommunityIcons name="grid" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon}>
            <Feather name="film" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon}>
            <Ionicons name="create-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      <View style={styles.postsContainer}>
        {userData.posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.postItem}
            onPress={() => navigation.navigate('PostDetail', { post })}
          >
            <Image source={post.imageUrl} style={styles.postImage} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    <View style={{backgroundColor:'#E16721', borderRadius: 20, marginBottom: 55,}}>
    <Text style={styles.streakText}>Streak: {userData.streakDays} days</Text>
    <View style={styles.streakLeveler}>
    <View style={styles.streakBadgeContainer}>
          {/* Customize the app badge image or component */}
          <Image source={require('../../assets/Start.jpg')} style={styles.appBadgeImage} />
        </View>
        <View style={styles.streakLine}>
          {/* You can customize the streak line style */}
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={userData.streakDays / 30} // Assuming a maximum streak of 30 days
            color="#fff"
          />
        </View>
        <View style={styles.streakBadgeContainer}>
          {/* Customize the app badge image or component */}
          <Image source={require('../../assets/Streak.jpeg')} style={styles.appBadgeImage} />
        </View>
      </View>
      </View>
    <BottomNavbar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    marginBottom:0,
  },
  scrollcontainer: {
    flex: 1,
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
    fontSize: 16,
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
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    back:{
      flexDirection: 'row',
    alignItems: 'center',
    },
    backButton:{
      fontSize: 20,
      paddingBottom: 5,
    },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align the elements horizontally
    padding: 20,
    paddingTop: 1, // Add spacing at the top
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
  },
  menuIcon: {
    padding: 10,
    marginLeft: 10,// Add spacing between icons
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  editProfileButton: {
    backgroundColor: '#E16721',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  editProfileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  postItem: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  streakLeveler: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius:10,
  },
  streakLine: {
    width: '80%',
    marginBottom: 5,
    margin: 5,
  },
  streakBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: "center",
    paddingTop: 5,
  },
  appBadgeImage: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
    // Add additional styling for the badge image
  },
});

export default ProfileScreen;
