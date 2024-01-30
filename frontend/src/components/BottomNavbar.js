// BottomNavbar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Image,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNavbar = ({ navigation }) => {
  return (
    <View style={styles.bottomNavbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.navItemText}><Icon name="home" size={25} color="#000" /></Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Story')}
      >
        <Image
        source={require('../../assets/Storypen.jpg')}
        style={{ width: 30, height: 35 }}
      />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('HelpDesk')}
      >
         <Image
        source={require('../../assets/HelpDesk.jpg')}
        style={{ width: 40, height: 30 }}
      />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Activate')}
      >
        <MaterialCommunityIcons name="gamepad-variant" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavbar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
    elevation:0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemText: {
    marginLeft: 15,
  },
});

export default BottomNavbar;
