import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

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
            style={{ paddingVertical: 12, backgroundColor: '#FFD700', marginHorizontal: 7, borderRadius: 20 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#4B5563' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 26 }}>
            <Text style={{ color: 'black', fontWeight: '600' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={{ fontWeight: '600', color: '#FFD700' }}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    // </SafeAreaView>
  );
}
