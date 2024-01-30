import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, Image} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import * as DocumentPicker from 'expo-document-picker';
import { Linking } from 'react-native';
import BottomNavbar from '../components/BottomNavbar';
import { Asset } from 'expo-asset';

const HelpLine = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [landmark, setLandmark] = useState('');
  const [isSelling, setIsSelling] = useState(false);
  const [isAddicted, setIsAddicted] = useState(false);
  const [errors, setErrors] = useState({});
  const [documentUri, setDocumentUri] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await DocumentPicker.requestDocumentPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need document access permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    setErrors({});
    if (!name) setErrors(errors => ({ ...errors, name: 'Name is required' }));
    if (!/^\+?\d{10}$/.test(mobileNumber)) setErrors(errors => ({ ...errors, mobileNumber: 'Mobile number is invalid' }));
    if (!message) setErrors(errors => ({ ...errors, message: 'Message is required' }));
    if (!location) setErrors(errors => ({ ...errors, location: 'Location is required' }));
    if (!landmark) setErrors(errors => ({ ...errors, landmark: 'Landmark is required' }));
  }, [name, mobileNumber, message, location, landmark]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // You can specify the allowed document types here
      });

      if (result.type === 'success') {
        console.log('Document picked:', result);
        setDocumentUri(result.uri); // Store the document URI
      } else {
        console.log('Document selection canceled');
      }
    } catch (error) {
      console.error('Document selection failed:', error);
    }
  };

  const makePhoneCall = () => {
    const phoneNumber = '9050891508'; // Replace with the specific phone number you want to call
    const dialUrl = `tel:${phoneNumber}`;
  
    Linking.canOpenURL(dialUrl)
      .then((supported) => {
        if (!supported) {
          console.error(`Phone dialing is not supported`);
        } else {
          return Linking.openURL(dialUrl);
        }
      })
      .catch((error) => {
        console.error(`An error occurred: ${error}`);
      });
  };

  const handleSubmit = async () => {
    if (Object.keys(errors).length === 0 && name && mobileNumber && message && location && landmark) {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Error", "Mail services are not available on this device.");
        return;
      }

      let mailOptions = {
        recipients: ['dhejanramesh@gmail.com'],
        subject: 'Complaint Form Submission',
        body: `We are writing to express our concern about a person within our community who appears to be struggling with drug addiction. This individual's behavior has raised significant alarms, including financial instability, neglect of personal hygiene, isolation from loved ones, and a noticeable decline in physical health.\n\nWe kindly request your assistance in addressing this situation. We believe your organization's expertise is vital in helping this individual overcome their addiction. Please reach out to us for any additional information or support required.\n\nThank you for your prompt attention to this matter.\n\nSuspect's Name: ${name}\nSuspect's Mobile Number: ${mobileNumber}\nMessage: ${message}\nLocation: ${location}\nLandmark: ${landmark}\nSelling: ${isSelling ? 'Yes' : 'No'}\nAddicted: ${isAddicted ? 'Yes' : 'No'}`,
        attachments : documentUri ? documentUri : [], // Attach the selected document
      };

      try {
        const result = await MailComposer.composeAsync(mailOptions);
        if (result.status === 'sent') {
          Alert.alert('Success', 'Your Complaint has been sent successfully.');
          // Clear the form fields and documentUri after successful submission
          setName('');
          setMobileNumber('');
          setMessage('');
          setLocation('');
          setLandmark('');
          setIsSelling(false);
          setIsAddicted(false);
          setDocumentUri(null);
        }
      } catch (error) {
        console.error('An error occurred while sending the email:', error);
        Alert.alert('Error', 'An error occurred while trying to send your Complaint.');
      }
    } else {
      Alert.alert('Validation Error', 'Please fill all the fields');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, margin: 10}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

<View style={styles.topNavbar}>
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.back}>
          <Text style={styles.backButton}>{'◀︎'}</Text>
          <Text style={styles.logo}>Helpline Form</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <Image
            source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }}
            style={styles.userPhoto}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Rest of the form */}
        <Text style={styles.label}>Reason for Complaining</Text>

        {/* Checkbox for Suspect's Mobile Number */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsSelling(!isSelling)} style={styles.checkbox}>
            {isSelling && <Text style={styles.checkboxCheckmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Suspect Found Selling Drugs</Text>
        </View>

        {/* Checkbox for Suspect's Name */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsAddicted(!isAddicted)} style={styles.checkbox}>
            {isAddicted && <Text style={styles.checkboxCheckmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Suspect Is addicted to Drugs</Text>
        </View>

        <Text style={styles.label}>Suspect's Name</Text>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Suspect's Mobile Number</Text>
        <TextInput
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={styles.input}
          keyboardType="phone-pad"
        />
        {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}

        <Text style={styles.label}>Additional Information</Text>
        <TextInput
          placeholder="Enter here"
          value={message}
          onChangeText={setMessage}
          style={[styles.input, styles.messageInput]}
          multiline
        />
        {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}

        <Text style={styles.label}>Location</Text>
        <TextInput
          placeholder="Enter Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

        <Text style={styles.label}>Landmark</Text>
        <TextInput
          placeholder="Enter a nearby landmark"
          value={landmark}
          onChangeText={setLandmark}
          style={styles.input}
        />
        {errors.landmark && <Text style={styles.errorText}>{errors.landmark}</Text>}


        <TouchableOpacity onPress={pickDocument} style={styles.button}>
          <Text style={styles.buttonText}>Select Document</Text>
        </TouchableOpacity>

        {documentUri && (
          <View style={styles.selectedDocumentContainer}>
            <Text style={styles.selectedDocumentText}>Selected Document:</Text>
            <Text style={styles.selectedDocumentUri}>{documentUri}</Text>
          </View>
        )}

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={makePhoneCall} style={styles.roundedButton}>
          <Text style={styles.roundedButtonText}>Make a Call</Text>
        </TouchableOpacity>
      </ScrollView>
    
      {/*Bottom Navbar*/}
      <BottomNavbar navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '105%',
    maxWidth: 400,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 10,
    paddingTop: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center', // Center the title horizontally
    marginBottom: 20,
  },
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingTop: 35,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 22,
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
    paddingLeft: 0,
    },
    backButton:{
      fontSize: 22,
      paddingBottom: 5,

    },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#e58249',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Checkbox styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  checkboxCheckmark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  // Selected document styles
  selectedDocumentContainer: {
    marginTop: 10,
  },
  selectedDocumentText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedDocumentUri: {
    fontSize: 14,
    color: '#333',
  },
  roundedButton: {
    backgroundColor: '#e58249',
    padding: 10, // Adjust the size as needed
    borderRadius: 25, // Adjust the roundness as needed
    alignItems: 'center',
    marginTop: 10, // Add spacing from the previous button
    alignSelf: 'center', // Center the button horizontally
  },
  roundedButtonText: {
    color: '#000',
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold',
  },
});

export default HelpLine;

HelpLine.navigationOptions = {
    headerMode:"none",
  };
