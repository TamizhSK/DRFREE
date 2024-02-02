import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet , ImageBackground,SafeAreaView} from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';

const Activate = ({ navigation}) => {
    return(<SafeAreaView style = {styles.container}>

    <View style={styles.container}>
      <View style={styles.topNavbar}>
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.back}>
          <Text style={styles.backButton}>{'◀︎'}</Text>
          <Text style={styles.logo}>Activate</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image
            source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }}
            style={styles.userPhoto}
          />
          <Text style={styles.userName}>Dhejan</Text>
        </View>
      </View>
      <ImageBackground
        source={require('../../assets/game1.jpg')} // Replace with the path to your image
        style={styles.backgroundImage}
      >
        {/* Your component content goes here */}
        <View style={styles.overlay}>
          <TouchableOpacity onPress={() =>
              navigation.navigate("QuizScreen")
            }style={styles.button}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <BottomNavbar navigation={navigation}/>
    </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'fff', // Use a color that represents a drug-free theme
      paddingTop:0,
      marginBottom:0,
    },
    topNavbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      paddingTop: 10,
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
    back:{
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton:{
        fontSize: 25,
        paddingBottom: 5,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        marginHorizontal: '-18%',
        marginBottom: 35,
        marginHorizontal: 0,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20, // Adjust the padding as needed
      },
      button: {
          padding: 17,
          width:190,
          borderRadius: 25,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop:'25%',
          marginBottom: 55,
          backgroundColor: "#000410",
      },
      buttonText: {
        color:"white",fontWeight:"600",textAlign:"center", fontSize: 20
      },
});

export default Activate;

Activate.navigationOptions={
    headerMode: "none",
}