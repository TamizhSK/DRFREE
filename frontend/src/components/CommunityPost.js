import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { BASEURL } from '@env';


export default function CommunityPost() {
  const navigation = useNavigation();

  const [event_Name, setevent_Name] = useState('');
  const [event_description, setevent_description] = useState('');
  const [Org_Id, setOrg_Id] = useState('');
  const [reg_link, setreg_link] = useState('');
  const [fileAttachment, setFileAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = BASEURL + '/api/comp/compost';

  const handleEventreg = async () => {
    if (event_Name === "") {
      alert("Please enter the event name");
      return;
    } else if (fileAttachment === null) {
      alert("Please attach an image!");
      return;
    } else if (event_description === '') {
      alert("Description Not Provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(apiUrl, {
        event_Name: event_Name,
        event_description: event_description,
        event_Poster: fileAttachment,
        Org_Id: Org_Id,
        reg_link: reg_link,
      });

      console.log(response);

      if (response.status === 200) {
        alert("Posted Successfully");
        navigation.navigate('Community');
      } else {
        console.error('Error Posting Data', response.data);
      }
    } catch (error) {
      console.error('Error during auth:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const UploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
        aspect: [1, 1],
        base64: true,
      });
      setFileAttachment(res.assets[0].base64);
    } catch (error) {
      console.log(error);
    }
  };


  const commonInputStyles = {
    padding: 13,
    backgroundColor: "#D1D5DB",
    color: "#4B5563",
    borderRadius: 30,
    marginBottom: 8,
  };

  return (
    <ScrollView>
    <View style={{ flex: 1, marginTop: 70, marginBottom: 50 }}>
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 8, padding: 10, borderRadius: 50 }}>
          <Text style={{ display: "flex", justifyContent: "center", textAlign: "center", fontWeight: "bold", fontSize: 22, paddingTop: 22, marginBottom: 20 }}>
            Create Community Post!
          </Text>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                color: "#4B5563",
                marginLeft: 16,
                marginBottom: 12,
                fontSize: 15,
              }}
            >
              Event Name
            </Text>
            <TextInput
              style={commonInputStyles}
              value={event_Name}
              placeholder="Enter Event Name"
              onChangeText={(text) => setevent_Name(text)}
            />
            <Text
              style={{
                color: "#4B5563",
                marginLeft: 16,
                marginBottom: 12,
                fontSize: 15,
              }}
            >
              Event Description
            </Text>
            <TextInput
              style={commonInputStyles}
              value={event_description}
              placeholder="Enter Event Description"
              onChangeText={(text) => setevent_description(text)}
            />
            <Text
              style={{
                color: "#4B5563",
                marginLeft: 16,
                marginBottom: 12,
                fontSize: 15,
              }}
            >
              Organization Id
            </Text>
            <TextInput
              style={commonInputStyles}
              value={Org_Id}
              placeholder="Enter Organization ID"
              onChangeText={(text) => setOrg_Id(text)}
            />
            <Text
              style={{
                color: "#4B5563",
                marginLeft: 16,
                marginBottom: 12,
                fontSize: 15,
              }}
            >
              Registration Link
            </Text>
            <TextInput
              style={commonInputStyles}
              value={reg_link}
              placeholder="Enter Registration Link"
              onChangeText={(text) => setreg_link(text)}
            />
           <Text style={{ color: '#4B5563', marginLeft: 16, marginBottom: 12, fontSize: 15 }}>Upload Poster</Text>
            <TouchableOpacity onPress={UploadImage} style={{ backgroundColor: '#FFD700', borderRadius: 20, paddingVertical: 12, marginTop: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#4B5563' }}>Attach Image</Text>
            </TouchableOpacity>
            {fileAttachment && (
        <View>
          <Image source={{uri: `data:image/jpeg;base64,${fileAttachment}`}} style={{ width: 200, height: 200 }} />
          <Text>{fileAttachment.fileName}</Text>
        </View>
      )}
            <TouchableOpacity
              onPress={handleEventreg}
              style={{ backgroundColor: '#FFD700', borderRadius: 20, paddingVertical: 12, marginTop: 8 }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#4B5563" />
              ) : (
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#4B5563' }}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}