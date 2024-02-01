import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      // Replace the following URL and endpoint with your actual backend details
      const apiUrl = 'http://172.16.22.99:6969/reset-password';

      // Make sure to handle the response based on your backend structure
      const response = await axios.post(apiUrl, { email });

      // Handle success, for example, show an alert or navigate to a success screen
      if (response.status === 200) {
        Alert.alert('Password Reset', 'Check your email for a password reset link.');
        navigation.goBack(); // Navigate back to the login or sign-in screen
      } else {
        // Handle other status codes or response errors
        console.error('Password reset failed:', response.data);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during password reset:', error.message);
    }
  };

  return (
    <View style={{ display : "flex" , justifyContent : "center" , padding : 10 , alignItems : "center" , marginTop: 300, marginBottom: 50}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Forgot Password</Text>
      <TextInput
       style={{
              padding: 10,
              width : 300,
              backgroundColor: '#D1D5DB',
              color: '#4B5563',
              borderRadius: 20,
              marginBottom: 8,
            }}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity
        onPress={handleResetPassword}
        style={{ backgroundColor: '#FFD700', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 15 , marginTop : 15 }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: themeColors.text }}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#6B7280' }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
