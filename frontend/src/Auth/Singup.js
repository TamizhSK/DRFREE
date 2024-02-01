import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');


  const handleSignUp = async () => {
    try {
      const apiUrl = 'http://172.16.22.99:6969/api/auth/UserSignUp';
      const response = await axios.post(apiUrl, {
        username: userName,
        fullname: fullName,
        email: email,
        password: password,
        parentname: parentName,
        parentEmail: parentEmail,
      });

      // Handle success, for example, navigate to the home screen
      if (response.status === 200) {
        navigation.navigate('Home');
      } else {
        // Handle other status codes or response errors
        console.error('Signup failed:', response.data);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during signup:', error.message);
    }
  };

  return (
    
    <View style={{ flex: 1, marginTop: 70, marginBottom: 50 }}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 8, padding: 10, borderRadius: 50 }}>
        <Text style={{ display: "flex", justifyContent: "center", textAlign: "center", fontWeight: "bold", fontSize: 22, paddingTop: 22 , marginBottom : 20 }}>
          Lets Create a Drug Free Society!
        </Text>
        <View style={{ padding: 10}}>
        <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>User Name</Text>
          <TextInput
            style={{
              padding: 13,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 8,
            }}
            value={userName}
            placeholder='Enter Name'
            onChangeText={(text) => setUserName(text)}
          />
          <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>Full Name</Text>
          <TextInput
            style={{
              padding: 13,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 8,
            }}
            value={fullName}
            placeholder='Enter Name'
            onChangeText={(text) => setFullName(text)}
          />
          <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>Email Address</Text>
          <TextInput
            style={{
              padding: 13,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 8,
            }}
            value={email}
            placeholder='Enter Email'
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>Password</Text>
          <TextInput
            style={{
              padding: 13,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 16,
            }}
            secureTextEntry
            value={password}
            placeholder='Enter Password'
            onChangeText={(text) => setPassword(text)}
          />
              <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>Father/Mother/Guardian Name</Text>
          <TextInput
            style={{
              padding: 13,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 16,
            }}
          
            value={parentName}
            placeholder='Enter Parent Name'
            onChangeText={(text) => setParentName(text)}
          />
              <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>Father/Mother/Guardian Email</Text>
          <TextInput
            style={{
              padding: 13,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 16,
            }}
          
            value={parentEmail}
            placeholder='Enter Parent Email'
            onChangeText={(text) => setParentEmail(text)}
          />
          <TouchableOpacity onPress={handleSignUp} style={{ backgroundColor: '#FFD700', borderRadius: 20, paddingVertical: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#4B5563' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
          <Text style={{ color: '#6B7280', fontWeight: '600' }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={{ fontWeight: '600', color: '#FFD700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
