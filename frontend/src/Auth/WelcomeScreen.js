import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const {user, isLogged} = useContext(AuthContext);
  useEffect(()=>{
    // isLogged();
    const fetchData = async() => {
      const user = await JSON.parse(await AsyncStorage.getItem('user'));
      if(user!==null){
        navigation.navigate('Home');
      }
    }
    fetchData();
    // console.log(user);
  },[])
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems : "center" , marginTop : 50}}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>
          Let's Get Started!
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            source={require('../../assets/du12mhz6__1_-removebg-preview.png')}
            style={{ width: 450, height: 350  , marginRight : 20 , display : "flex" , justifyContent : "center"}}
          />
        </View>
        <View style={{ marginVertical: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{ paddingVertical: 12, backgroundColor: '#E16721CC', marginHorizontal: 7, borderRadius: 20 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#000' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 26 }}>
            <Text style={{ color: 'black', fontWeight: '600' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={{ fontWeight: '600', color: '#E16721CC' }}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    // </SafeAreaView>
  );
}
