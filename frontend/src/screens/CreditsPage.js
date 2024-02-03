// CreditsPage.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavbar from '../components/BottomNavbar';

const CreditsPage = ({ navigation }) => {
  const creditsData = [
    { name: 'Dr. John Doe', designation: 'Medical Advisor' },
    { name: 'Dr. Jane Smith', designation: 'Psychiatrist' },
    { name: 'Director John', designation: 'Drug De-Addiction Director' },
    { name: 'Director Sarah', designation: 'Rehabilitation Director' },
    // Add more entries as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Credits</Text>
      <View style={styles.list}>
        {creditsData.map((person, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.designation}>{person.designation}</Text>
          </View>
        ))}
      </View>
      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
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
  },
  list: {
    alignItems: 'center',
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
