import {React, useState, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import {BASEURL} from '@env';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function CommunitySignInScreen() {
  const {test, login, logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleSignIn = async() => {
    try {
      // logout();
      // navigation.navigate('Home');
      // Replace the following URL with your actual backend authentication endpoint
      const apiUrl = BASEURL+'/api/auth/CommunitySignin';
      console.log(Email, Password);
      // navigation.navigate('Home');
      const response = await axios.post(apiUrl, {
        email: Email,
        password: Password,
      });
      
      const responseData = response.data;
      console.log(responseData);

      // Check the response status
      if (response.status==200) {
        // Handle successful login, e.g., store user token in AsyncStorage
        console.log('Login successful:', responseData);
        await login(responseData);
        // Redirect to the Home screen or perform other navigation actions
        navigation.navigate('Home');
      } else {
        // Handle login failure, e.g., display an error message
        console.error('Login failed:', responseData.error);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error.message);
    }
  };


  return (
    <View style={{ flex: 1 , marginTop : 70 , marginBottom : 50}}>
      <View
         style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 8, padding: 10, borderRadius: 50}}>
        <View style = {{padding : 15 , display : "flex" , justifyContent : "center" , marginTop : 140}}>
          <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>{test} Email Address</Text>
          <TextInput
            style={{
              padding: 13,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 17,
              marginTop : 10,
            }}
            placeholder="email"
            value={Email}
            onChangeText={(e) => setEmail(e)}
          />
          <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>Password</Text>
          <TextInput
            style={{
              padding: 13,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 18,
              marginTop : 10,
            }}
            secureTextEntry
            placeholder="password"
            value={Password}
            onChangeText={(e) => setPassword(e)}
          />
          <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => navigation.navigate('passreset')}>
            <Text style={{ color: '#4B5563', marginBottom: 16 }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignIn} style={{ backgroundColor: '#FFD700', borderRadius: 20, paddingVertical: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#4B5563' }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 32 }}>
          <Text style={{ color: '#6B7280', fontWeight: '600' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ fontWeight: '600', color: '#FFD700' }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
