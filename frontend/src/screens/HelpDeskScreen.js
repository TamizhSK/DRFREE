import React, { useContext } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BottomNavbar from '../components/BottomNavbar';
import { Asset } from 'expo-asset';
import { AuthContext } from '../../context/AuthContext';
const HelpDeskBanners = ({ navigation }) => {
  const {user} = useContext(AuthContext);
  return (
    <View style={styles.container}>
        <View style={styles.topNavbar}>
        <Text style={styles.logo}>Help Desk</Text>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
          <Text style={styles.userName}>{user.username}</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
      {/* Community Banner */}
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={() => navigation.navigate('Community')}
      >
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/community-banner.jpg')).uri }}
          style={styles.bannerImage}
        />
      </TouchableOpacity>

      {/* Education of Drug Banner */}
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={() => navigation.navigate('EducationOfDrug')}
      >
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/education-of-drug-banner.jpg')).uri }}
          style={styles.bannerImage}
        />
      </TouchableOpacity>

      {/* Doctors Connection Banner */}
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={() => navigation.navigate('DocHomeScreen')}
      >
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/doctors-connection-banner.jpg')).uri }}
          style={styles.bannerImage}
        />
      </TouchableOpacity>

      {/*Ai chat*/}
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={() => navigation.navigate('AiChatbot')}
      >
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/AI_Chatbots.png')).uri }}
          style={styles.bannerImage}
        />
      </TouchableOpacity>
      </ScrollView>
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Use a color that represents a drug-free theme
    margin: 10,
    paddingTop:0,
    marginBottom:0,
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
  bannerContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
});

export default HelpDeskBanners;
