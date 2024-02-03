// CreditsPage.js

import React from 'react';
import { View, Text, StyleSheet,Image , TouchableOpacity} from 'react-native';
import BottomNavbar from '../components/BottomNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Asset } from 'expo-asset';

const CreditsPage = ({ navigation }) => {
  const creditsData = [
    { name: 'Dr. J . Devaraj', designation: 'TamilNadu State Drug De-addiction & Rehabilitation center (President)' , image:  Asset.fromModule(require('../../assets/director.png')).uri},
    { name: 'Dr . Sudarshan', designation: 'Head Of Keerthi foundation center', image:  Asset.fromModule(require('../../assets/keerthifoundation.jpeg')).uri },
    { name: 'Dr . M . Sarath Kumar', designation: 'Medical Councellor' , image:  Asset.fromModule(require('../../assets/doctor.png')).uri},
    { name: 'Dr. P. Vasanth Kumar', designation: 'Clinical Psychologist' , image:  Asset.fromModule(require('../../assets/doctor.png')).uri},
    { name: 'Mr. Venkatesan R', designation: 'Sub Inspector - Law and Order' , image:  Asset.fromModule(require('../../assets/police.jpeg')).uri},
    { name: 'Patient', designation: 'Keerthi Foundation for Drug \nDe-addiction & Rehabilitation Center' , image:  Asset.fromModule(require('../../assets/keerthifoundation.jpeg')).uri},
    // Add more entries as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.back}>
          <Text style={styles.backButton}>{'◀︎'}</Text>
          <Text style={styles.logo}>Credits</Text>
          </View>
        </TouchableOpacity>
        <View style={{height:15}}/>
      <View style={styles.list}>
        {creditsData.map((person, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.userContainer}>
            <Image source={{ uri: person.image}} style={styles.userPhoto}/>
            <View>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.designation}>{person.designation}</Text>
            </View>
            </View>
          </View>
        ))}
      </View>
      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 3,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  list: {
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back:{
    flexDirection: 'row',
  alignItems: 'center',
  },
  backButton:{
    fontSize: 25,
    paddingBottom: 5,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000', // White color for the logo text
  },
  item: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  designation: {
    fontSize: 14,
    color: '#666',
  },
});

export default CreditsPage;
