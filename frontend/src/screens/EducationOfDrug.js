import React, { useState , useContext} from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';
import { AuthContext } from '../../context/AuthContext';

const EducationOfDrug = ({ navigation }) => {
    const [activeButton, setActiveButton] = useState(null);
    const {user} = useContext(AuthContext);
    const handleButtonPress = (buttonName) => {
      setActiveButton(buttonName);
      // Add logic for handling button press (if needed)
  
      // Add logic to change the button color on press
      switch (buttonName) {
        case 'Doctors':
          // Code to change the color of the 'Doctors' button
          break;
        case 'RehabCenter':
          navigation.navigate('RehabCenter')
          break;
        case 'Helpline':
          navigation.navigate('HelpLine');
          break;
        default:
          break;
      }
  
      // Add navigation logic here if needed
    };
    setTimeout(() => {
        setActiveButton(null);
      }, 50);
  return (
    <SafeAreaView style = {styles.container}>
    <View style={styles.container}>
      <View style={styles.topNavbar}>
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.back}>
          <Text style={styles.backButton}>{'◀︎'}</Text>
          <Text style={styles.logo}>Education</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image
            source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }}
            style={styles.userPhoto}
          />
          <Text style={styles.userName}>{user.username}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Doctors' && { backgroundColor: '#E16721CC' },
          ]}
          onPress={() => handleButtonPress('Doctors')}
        >
          <Text style={styles.buttonText}>Doctors</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'RehabCenter' && { backgroundColor: '#E16721CC' },
          ]}
          onPress={() => handleButtonPress('RehabCenter')}
        >
          <Text style={styles.buttonText}>Rehabilitation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Helpline' && { backgroundColor: '#E16721CC' },
          ]}
          onPress={() => handleButtonPress('Helpline')}
        >
          <Text style={styles.buttonText}>Helpline</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
      {/* Community Banner */}
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={() => navigation.navigate('Addversedrug')}
      >
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/Edu3.jpg')).uri }}
          style={styles.bannerImage}
        />
      </TouchableOpacity>

      {/* Education of Drug Banner */}
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={() => navigation.navigate('LegalConsequencesPage')}
      >
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/Edu1.jpg')).uri }}
          style={styles.bannerImage}
        />
      </TouchableOpacity>

      {/* Doctors Connection Banner */}
      <TouchableOpacity
        style={styles.bannerContainer}
        onPress={() => navigation.navigate('EduHelp')}
      >
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/Edu2.jpg')).uri }}
          style={styles.bannerImage}
        />
      </TouchableOpacity>
      </ScrollView>

      {/*Bottom Navbar*/}
      <BottomNavbar navigation={navigation} />
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'fff', // Use a color that represents a drug-free them
      paddingTop:0,
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
        fontSize: 25,
        paddingBottom: 5,
      },
      button: {
        flex: 1,
        gap: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        backgroundColor: '#ddd',
        marginHorizontal: 2, // Increase the horizontal margin
        borderWidth: 1,
    borderColor: '#E16721',
      },
      activeButton: {
        backgroundColor: '#E16721CC', // Dark color for the active button
      },
      buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000',
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
    scrollContainer: {
        flex: 1,
        margin: 4,
      },
      bannerContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
      },
      bannerImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
      },
    
  });
export default EducationOfDrug;
  
EducationOfDrug.navigationOptions = {
    headerMode:"none",
};