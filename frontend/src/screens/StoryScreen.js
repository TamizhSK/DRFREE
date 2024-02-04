// screens/StoryScreen.js
import React ,{ useContext }from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import BottomNavbar from '../components/BottomNavbar';
import { Asset } from 'expo-asset';
import { AuthContext } from '../../context/AuthContext';
const StoryScreen = ({ navigation }) => {
  const {user, usertype} = useContext(AuthContext);
  console.log(usertype); 
  const stories = [
    { id: 1, 
      user: { name: 'Jane Smith', 
      photoUrl: Asset.fromModule(require('../../assets/profile2.jpeg')).uri}, 
      title: 'Breaking the Chains', 
      preview: 'Preview: Join us on a journey of resilience and triumph as individuals break free from the chains of addiction. Discover stories of courage, hope, and the power of support in creating a drug-free life.', 
      content: 'Embark on a poignant journey as individuals bravely shatter the chains of addiction. These stories delve into the heart-wrenching battles faced by each person, emphasizing the unwavering courage, resilience, and the vital role of support systems. Readers will witness the transformation from the depths of despair to the pinnacle of recovery. These narratives capture pivotal moments, turning points, and the therapeutic interventions that contributed to their triumph over addiction. By sharing these stories, we aim to inspire hope, foster understanding, and encourage a compassionate approach towards those on the path to a drug-free life.'
     },
    { id: 2, 
        user: { name: 'John Doe', 
        photoUrl: Asset.fromModule(require('../../assets/profile.jpeg')).uri }, 
        title: 'From Darkness to Light', 
        preview: 'Preview: Experience the transformative stories of those who emerged from the shadows of addiction into the radiant light of recovery. These tales illustrate the possibility of redemption, renewal, and a drug-free future.', 
        content: 'Explore stories of redemption and renewal as individuals transition from the shadows of addiction into the radiant light of recovery. The narratives illuminate the transformative power of self-discovery, community support, and the pursuit of a drug-free future. Readers will be immersed in personal accounts of resilience, perseverance, and the profound impact of positive choices on the journey toward recovery. These stories exemplify the possibility of finding purpose, joy, and a renewed sense of self amidst the challenges of addiction.'
      },
    { id: 3, 
        user: { name: 'Bob Johnson', 
        photoUrl: Asset.fromModule(require('../../assets/profile4.jpeg')).uri   }, 
        title: 'A Ripple of Change', 
        preview: 'Preview: Explore the stories of everyday heroes creating ripples of change in their communities, fostering awareness about the impact of drugs, and inspiring others to join the movement towards a drug-free society.', 
        content: ' Immerse yourself in the tales of ordinary individuals creating ripples of change in their communities, advocating for awareness, and inspiring a collective movement towards a drug-free society. These stories showcase initiatives, events, and grassroots efforts led by passionate advocates, educators, and community leaders. Through their dedicated work, these individuals aim to break down barriers, educate the public, and foster a sense of unity in the fight against drug abuse. By amplifying these voices, we hope to inspire others to join the cause and contribute to the positive transformation of society.' 
    },
    { id: 4, 
        user: { name: 'Alice Williams', 
        photoUrl: Asset.fromModule(require('../../assets/profile3.jpeg')).uri   }, 
        title: 'A Ripple of Change', 
        preview: 'Preview: Dive into the butterfly effect of sobriety - how small, positive choices can create a cascade of transformative change. Witness the stories of individuals who, through their commitment to sobriety, influence those around them and shape a brighter future.' ,
        content: ' Journey into the butterfly effect of sobriety, where small positive choices create a cascade of transformative change. These narratives portray individuals who, through their commitment to sobriety, become catalysts for positive transformations in their lives and communities. Each story unfolds the interconnectedness of personal growth, resilience, and the profound influence that sobriety can have on others. Through these inspiring accounts, readers will witness the contagious nature of positive change and the far-reaching impact of choosing a drug-free path.' 
    },
    { id: 5, 
        user: { name: 'Charlie Davis', 
        photoUrl: Asset.fromModule(require('../../assets/profile5.jpeg')).uri   }, 
        title: 'Voices Unveiled', 
        preview: 'Preview: Unveil the powerful voices of those who, once silenced by addiction, now speak loudly against its grip. These stories bring attention to the importance of breaking the stigma surrounding addiction and fostering open conversations about recovery.', 
        content: 'Unveil the powerful voices of those once silenced by addiction, now speaking boldly against its grip. These stories shed light on the struggles individuals face in seeking help, the importance of breaking the stigma surrounding addiction, and the role of empathy in building a compassionate, drug-free society. Readers will be moved by personal testimonials that emphasize the need for open conversations about recovery, mental health, and the collective responsibility to support those on their journey to a healthier, drug-free life. These narratives aim to dismantle misconceptions, fostering a culture of understanding, acceptance, and hope.' 
    },
    // Add more stories
  ];

  return (
    <SafeAreaView style = {styles.container}>
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.topNavbar}>
        <Text style={styles.logo}>Story</Text>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          {(usertype==='doc' || usertype==='com') && <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate('CreateStory')}
          >
            <Text style={styles.createPostButtonText}>+</Text>
          </TouchableOpacity>}
          <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto}/>
            </TouchableOpacity>
            <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          >
          <Text style={styles.userName}>{user.username}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ScrollView for stories */}
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.pad}>
        {/* Map through stories and render story components */}
        {stories.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyContainer}
            onPress={() => navigation.navigate('StoryDetail', { story })}
          >
            {/* User details */}
            <View style={styles.storyUserContainer}>
              <Image source={{ uri: story.user.photoUrl }} style={styles.storyUserPhoto} />
              <Text style={styles.storyUserName}>{story.user.name}</Text>
              <Image
                source={require('../../assets/verification.png')} // Verification icon
                style={styles.verificationIcon}
              />
            </View>

            {/* Story content (short preview) */}
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyPreview}>{story.preview}</Text>
          </TouchableOpacity>
        ))}
        </View>
      </ScrollView>
      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom:0,
  },
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 43,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
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
  pad:{
    paddingBottom: 35,
  },
  scrollContainer: {
    flex: 1,
    margin: 7,
  },
  createPostButton: {
    padding: 13, backgroundColor: "#e28743", borderRadius: 90, marginRight: 10, height: 40, 
  },
  createPostButtonText: {
    color: "white", textAlign: "center", fontWeight: "bold", alignSelf: "center", marginTop: 0, fontSize: 15,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    margin : 5,
  },
  storyPreview: {
    fontSize: 16,
    color: '#555',
    margin:5,
  },
  storyContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    margin: 7,
    backgroundColor: '#CBC5C8CC',
  },
  storyUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  storyUserPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  storyUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  verificationIcon: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
    marginLeft: 5, // Adjust the margin as needed
  },
  storyImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  storyContent: {
    padding: 15,
    fontSize: 16,
    color: '#555',
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
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
    color: '#000',
  },
});

export default StoryScreen;

StoryScreen.navigationOptions = {
  headerMode:"none",
};