import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView,Button,Image } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import axios from 'axios';
import { BASEURL } from '@env';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [fileAttachment, setFileAttachment] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');

  const [DocuserName, setDocuserName] = useState('');
  const [DocfullName, setDocfullName] = useState('');

  const [communityName, setCommunityName] = useState('');
  //const [communityEmail, setCommunityEmail] = useState('');

  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');

  const [selectedIndex, setSelectedIndex] = useState(0);

  const UploadImage = async() => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.025,
        aspect: [1, 1],
        base64: true,
      });
      console.log(res.assets[0].base64);
      setFileAttachment(res.assets[0].base64);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUserSignUp = async () => {
    try {
      const apiUrl = BASEURL + '/api/auth/UserSignUp';
      const response = await axios.post(apiUrl, {
        username: userName,
        fullname: fullName,
        email: email,
        password: password,
        parentname: parentName,
        parentEmail: parentEmail,
      });

      if (response.status === 200) {
        navigation.navigate('Home');
      } else {
        console.error('Signup failed:', response.data);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  const handleDocSignUp = async () => {
    try {
      const apiUrl = BASEURL + '/api/auth/DocSignUp';
      const response = await axios.post(apiUrl, {
        username: DocuserName,
        fullname: DocfullName,
        email: email,
        password: password,
        licence: fileAttachment,
      });

      if (response.status === 200) {
        navigation.navigate('Home');
      } else {
        console.error('Signup failed:', response.data);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  const handleComSignUp = async () => {
    try {
      const apiUrl = BASEURL + '/api/auth/ComSignUp';
      const response = await axios.post(apiUrl, {
        communityname: communityName,
        email: email,
        password: password,
        licence: fileAttachment,
      });

      if (response.status === 200) {
        navigation.navigate('Home');
      } else {
        console.error('Signup failed:', response.data);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };
  useEffect(() => {
    setEmail
  })


  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
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
              <TouchableOpacity onPress={handleUserSignUp} style={{ backgroundColor: '#FFD700', borderRadius: 20, paddingVertical: 12 }}>
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
      case 1:
        return (
<View style={{ flex: 1, marginTop: 70, marginBottom: 50 }}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 8, padding: 10, borderRadius: 50 }}>
      <Text style={{ display: "flex", justifyContent: "center", textAlign: "center", fontWeight: "bold", fontSize: 22, paddingTop: 22 , marginBottom : 20 }}>
          Docter User Sign Up!
        </Text>
        <Text style={{ display: "flex", justifyContent: "center", textAlign: "center", fontWeight: "bold", fontSize: 22, paddingTop: 22 , marginBottom : 20 }}>
          Come on Lets Create a Drug Free Society!
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
            value={DocuserName}
            placeholder='Enter Name'
            onChangeText={(text) => setDocuserName(text)}
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
            value={DocfullName}
            placeholder='Enter Name'
            onChangeText={(text) => setDocfullName(text)}
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
          <Button title="Upload Licence" onPress={UploadImage} />
      {fileAttachment && (
        <View>
          <Image source={{uri: `data:image/jpeg;base64,${fileAttachment}`}} style={{ width: 200, height: 200 }} />
          <Text>{fileAttachment.fileName}</Text>
        </View>
      )}
          <TouchableOpacity onPress={handleDocSignUp} style={{ backgroundColor: '#FFD700', borderRadius: 20, paddingVertical: 12 }}>
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
      case 2:
        return (
<View style={{ flex: 1, marginTop: 70, marginBottom: 50 }}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 8, padding: 10, borderRadius: 50 }}>
      <Text style={{ display: "flex", justifyContent: "center", textAlign: "center", fontWeight: "bold", fontSize: 22, paddingTop: 22 , marginBottom : 20 }}>
          Community Sign Up!
        </Text>
        <Text style={{ display: "flex", justifyContent: "center", textAlign: "center", fontWeight: "bold", fontSize: 22, paddingTop: 22 , marginBottom : 20 }}>
          Come on Lets Create a Drug Free Society!
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
            value={communityName}
            placeholder='Enter Name'
            onChangeText={(text) => setCommunityName(text)}
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
        <Button title="Upload Licence" onPress={UploadImage} />
      {fileAttachment && (
        <View>
          <Image source={{uri: `data:image/jpeg;base64,${fileAttachment}`}} style={{ width: 200, height: 200 }} />
          <Text>{fileAttachment.fileName}</Text>
        </View>
      )}
          <TouchableOpacity onPress={handleComSignUp} style={{ backgroundColor: '#FFD700', borderRadius: 20, paddingVertical: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#4B5563' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
          <Text style={{ color: '#6B7280', fontWeight: '600' }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={{ fontWeight: '600', color: '#E16721CC' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
        );
      default:
        return null;
    }
  };


  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 8, padding: 10, borderRadius: 50 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, paddingTop: 22, marginBottom: 20 }}>
          Lets Create a Drug Free Society!
        </Text>

        <SegmentedControlTab
          values={['User Signup', 'Doctor Signup', 'Community Signup']}
          selectedIndex={selectedIndex}
          onTabPress={(index) => {
            setEmail('');
            setPassword('');
            setSelectedIndex(index);
          }}
        />

        {renderContent()}

      
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;