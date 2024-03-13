import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { AuthContext } from "../../context/AuthContext";

const CheckLocation = () => {
  
  const { location } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState(null);

  // const init

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log(currentLocation); // Log the current location data

        // Set the location in the context or state, based on your application's logic
      } catch (error) {
        console.error("Error fetching location: ", error);
        setErrorMsg("Error fetching location");
      }
    })();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
    <Text>Your Current location</Text>
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        style={styles.map}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default CheckLocation;