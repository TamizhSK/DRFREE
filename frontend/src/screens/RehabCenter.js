import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, FlatList, Linking } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
const RehabCenter = ({ navigation }) => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const openSlider = (center) => {
    setSelectedCenter(center);
  };

  const closeSlider = () => {
    setSelectedCenter(null);
  };

  const navigateToGoogleMaps = () => {
    if (selectedCenter) {
      const { latitude, longitude } = selectedCenter;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };
  const rehabCentersData = [
    {
      id: '1',
      name: 'Care Home Drug Rehab Center',
      location: 'Kharar',
      imageUrl: require('../../assets/rehab1.jpg'),
      contact: 'Contact: +91 8401750847',
      latitude: 30.7513, // Approximate latitude for the specified location
      longitude: 76.6464, // Approximate longitude for the specified location
    },
    {
      id: '9',
      name: 'Parivartan Foundation',
      location: 'Mundka, Delhi',
      imageUrl: require('../../assets/rehab9.jpg'),
      contact: 'Contact: +91 8123019252',
      latitude: 28.682513421851077, // Approximate latitude for the specified location
      longitude: 77.04397591730387
    },
    // Add more centers as needed
    {
      id: '3',
      name: 'Pancham Manorog Hospital',
      location: 'Mohali',
      imageUrl: require('../../assets/rehab3.jpg'),
      contact: 'Contact: +91 7947123178',
      latitude: 30.676986893835522, // Approximate latitude for the specified location
      longitude: 76.66699540120285
    },
    {
      id: '10',
      name: 'Lakshya De-Addiction Center',
      location: 'Chandigarh',
      imageUrl: require('../../assets/rehab10.jpg'),
      contact: 'Contact: +91 8401918092',
      latitude: 30.7279670578866, // Approximate latitude for the specified location
      longitude: 76.67321889559068
    },
    {
      id: '5',
      name: 'Guru Mehar Foundation',
      location: 'Kharar',
      imageUrl: require('../../assets/rehab5.jpg'),
      contact: 'Contact: +91 9855102500',
      latitude: 30.73111945651516, // Approximate latitude for the specified location
      longitude: 76.65496177627097
    },
    {
      id: '6',
      name: 'Nari Sewa Foundation',
      location: 'Chandigarh',
      imageUrl: require('../../assets/rehab6.jpg'),
      contact: 'Contact: +91 9779480084',
      latitude: 30.775320608713574, 
      longitude:76.76980915326385,
    },
    {
      id: '7',
      name: 'Path to Serenity',
      location: 'Chandigarh',
      imageUrl: require('../../assets/rehab7.jpg'),
      contact: 'Contact: +91 9980233375',
      latitude: 30.7279670578866, 
      longitude:76.67324035326195,
    },
    {
      id: '8',
      name: 'Sarvam Neuropsychiatric Clinic',
      location: 'Panchkula',
      imageUrl: require('../../assets/rehab8.jpg'),
      contact: 'Contact: +91 9980233375',
      latitude: 30.7279670578866, 
      longitude:76.67324035326195,
    },
    {
      id: '2',
      name: 'Aarogya De-Addiction Centre',
      location: 'Chandigarh',
      imageUrl: require('../../assets/rehab2.jpg'),
      contact: 'Contact: +91 7383773713',
      latitude: 30.69421301101484,  
      longitude:76.86361996850427,
    },
    {
      id: '4',
      name: 'Astitva Rehabilitation Center',
      location: 'Kharar',
      imageUrl: require('../../assets/rehab4.jpg'),
      contact: 'Contact: +91 70419438414',
      latitude: 30.442264533482994, 
      longitude: 77.73760084393658, 
    }
  ];

  const renderRehabCenterItem = ({ item }) => (
    <TouchableOpacity onPress={() => openSlider(item)} style={styles.centerContainer}>
    <View >
      <Image source={item.imageUrl} style={styles.centerImage} />
      <Text style={styles.centerName}>{item.name}</Text>
      <View style={styles.locationContainer}>
        <FontAwesome name="map-marker" size={14} color="#555" style={styles.locationSymbol} />
        <Text style={styles.centerLocation}>{item.location}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

    return(
        <View style={styles.container}>
        {/* Top Navbar */}
        <View style={styles.topNavbar}>
          <Text style={styles.logo}>Rehab Centers</Text>
          <View style={styles.userContainer}>
            {/* Add the user's profile picture and name */}
            <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
            <Text style={styles.userName}>Dhejan</Text>
          </View>
        </View>
        <Text style={{
            display: "flex",
            fontSize: 20,
            textAlign: "center",
            paddingTop: 10,
            color: "#E69F7C",

        }}>Discover various Rehablitation </Text>
        
        <Text style={{
            display: "flex",
            fontSize: 18,
            textAlign: "center",
            color: "#E69F7C",
            paddingBottom: 20,
        }}>centers in your location ! </Text>
        <View style={{paddingBottom:20}}>
        <View style={styles.searchbar}>
          <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields: "geometry"}}
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            }}
            query={{
            key: "AIzaSyDWpuWpuVw2apN-XgX3gmrzsHrZgr1AG4sCxQ",
            language: 'en',
            }}
          />
        </View>
        </View>
        <FlatList
        data={rehabCentersData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderRehabCenterItem}
        contentContainerStyle={styles.listContainer}
      />
      <Modal isVisible={selectedCenter !== null} onBackdropPress={closeSlider} style={styles.modal}>
        <View style={styles.sliderContainer}>
          <Image source={selectedCenter?.imageUrl} style={styles.sliderImage} />
          <Text style={styles.sliderName}>{selectedCenter?.name}</Text>
          <Text style={styles.sliderLocation}>{selectedCenter?.location}</Text>
          <Text style={styles.sliderContact}>{selectedCenter?.contact}</Text>
          
          {/* Map with Marker */}
          <MapView style={styles.map} initialRegion={{
            latitude: selectedCenter?.latitude || 0,
            longitude: selectedCenter?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
            <Marker coordinate={{ latitude: selectedCenter?.latitude || 0, longitude: selectedCenter?.longitude || 0 }} />
          </MapView>

          {/* Map Navigation Button */}
          <TouchableOpacity style={styles.mapNavigationButton} onPress={navigateToGoogleMaps}>
            <FontAwesome name="map-marker" size={24} color="#fff" />
            <Text style={styles.mapNavigationText}>Navigate</Text>
          </TouchableOpacity>
        </View>
      </Modal>

        <BottomNavbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff', // Use a color that represents a drug-free theme
        margin: 10,
        paddingTop:0,
      },
      topNavbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingTop: 35,
        borderBottomColor: '#ddd',
      },
      logo: {
        fontWeight: 'bold',
        fontSize: 18,
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
      searchbar:{
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        backgroundColor: "#fff",
        marginLeft:4,
        marginRight: 4,
        paddingTop:1,
        paddingBottom: 1,
        paddingLeft:4,
        paddingRight: 4,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      listContainer: {
        justifyContent: 'space-between',
        paddingBottom: 40,
      },
      centerContainer: {
        flex: 1,
        margin: 8,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
      },
      centerImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
      },
      centerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      locationSymbol: {
        marginRight: 4,
      },
      centerLocation: {
        fontSize: 14,
        color: '#555',
      },
      modal: {
        margin: 0,
        justifyContent: 'flex-end',
      },
      sliderContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        alignItems: 'center',
      },
      sliderImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
      },
      sliderName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      sliderLocation: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
      },
      sliderContact: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
      },
      map: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
      },
      mapNavigationButton: {
        backgroundColor: '#3498db',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
      },
      mapNavigationText: {
        color: '#fff',
        marginLeft: 8,
      },
});

export default RehabCenter;

RehabCenter.navigationOptions={
    headerMode : "none",
}