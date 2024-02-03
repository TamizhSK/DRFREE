import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {BASEURL} from '@env';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState('request'); // 'request' or 'verify'

  const handleResetPassword = async () => {
    try {
      if (resetStep === 'request') {
        // Requesting OTP
        const apiUrl = BASEURL+'/api/rst/sendOTPVerification';
        const response = await axios.post(apiUrl, { email });
        
        if (response.status === 200) {
          setResetStep('verify');
          Alert.alert('OTP Sent', 'Check your email for an OTP.');
        } else {
          console.error('Failed to send OTP:', response.data);
        }
      } else if (resetStep === 'verify') {
        // Verifying OTP and resetting password
        console.log(otp,newPassword);
        const apiUrl = BASEURL+'/api/rst/verifyOTP';
        if(newPassword===""){
          Alert.alert("New Password can't be Empty");
          return;
        }
        const response = await axios.post(apiUrl, { email, otp, newPassword });

        if (response.status === 200) {
          Alert.alert('Password Reset', 'Password has been reset successfully.');
          navigation.goBack();
        } else {
          console.error('Password reset failed:', response.data);
        }
      }
    } catch (error) {
      console.error('Error during password reset:', error.message);
    }
  };

  return (
    <View style={{ display: 'flex', justifyContent: 'center', padding: 10, alignItems: 'center', marginTop: 300, marginBottom: 50 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        {resetStep === 'request' ? 'Forgot Password' : 'Verify OTP and Reset Password'}
      </Text>

      <TextInput
        style={{
          padding: 10,
          width: 300,
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

      {resetStep === 'verify' && (
        <TextInput
          style={{
            padding: 10,
            width: 300,
            backgroundColor: '#D1D5DB',
            color: '#4B5563',
            borderRadius: 20,
            marginBottom: 8,
          }}
          placeholder="Enter OTP"
          keyboardType="numeric"
          onChangeText={(text) => setOtp(text)}
        />
      )}

      {resetStep === 'verify' && (
        <TextInput
          style={{
            padding: 10,
            width: 300,
            backgroundColor: '#D1D5DB',
            color: '#4B5563',
            borderRadius: 20,
            marginBottom: 8,
          }}
          placeholder="Enter new password"
          secureTextEntry
          onChangeText={(text) => setNewPassword(text)}
        />
      )}

      <TouchableOpacity
        onPress={handleResetPassword}
        style={{ backgroundColor: '#FFD700', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 15, marginTop: 15 }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: themeColors.text }}>
          {resetStep === 'request' ? 'Send OTP' : 'Verify and Reset Password'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#6B7280' }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
