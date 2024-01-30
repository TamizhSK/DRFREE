// components/MySlider.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const MySlider = ({ navigation }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    { id: 1, image: require('../../assets/banner1.jpg'), buttonText: 'Booking Webinars' },
    { id: 2, image: require('../../assets/banner2.jpg'), buttonText: 'Rehabs' },
    { id: 3, image: require('../../assets/banner31.jpg'), buttonText: 'Inform NGO' },
  ];

  useEffect(() => {
    // Automatically transition to the next slide every 3 seconds
    const autoplayInterval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (currentIndex + 1) % banners.length;
        carouselRef.current.snapToItem(nextIndex);
      }
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [currentIndex]);

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const handleButtonPress = (index) => {
    // Your logic to navigate to different screens
    switch (index) {
      case 0:
        navigation.navigate('Community'); // Replace 'Community' with the actual screen name
        break;
      case 1:
        navigation.navigate('RehabCenter'); // Replace 'Story' with the actual screen name
        break;
      case 2:
        navigation.navigate('HelpLine'); // Replace 'HelpDesk' with the actual screen name
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={banners}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Image source={item.image} style={styles.bannerImage} />
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(item.id - 1)}>
              <Text style={styles.buttonText}>{item.buttonText}</Text>
            </TouchableOpacity>
          </View>
        )}
        sliderWidth={330} // Adjust based on your design
        itemWidth={300}   // Adjust based on your design
        sliderHeight={100}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        loop={true}
        autoplay={false} // Set to true to enable autoplay
        onSnapToItem={handleIndexChanged}
      />

      <View>
        {banners.map((banner) => (
          <Text key={banner.id} style={{ display: currentIndex === banner.id - 1 ? 'flex' : 'none' }}>
            {/* Additional text content for each banner if needed */}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100, // Adjust the height based on your design
    margin: 5,
    borderRadius: 5,
    paddingLeft : 2,
    paddingRight:3,
    overflow: 'hidden',
    columnGap: 5,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  button: {
    position: 'absolute',
    bottom: '90%',
    transform: [{ translateY: 50 }],
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#76b900',
    borderWidth: 2,
    borderColor: '#5a8900',
    // Additional styles for a keyboard key look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation: 100, // For Android elevation
  },
  
  
  buttonText: {
    color: '#fff',
    fontSize: 16, // Reduce the font size
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
    fontWeight: 'bold',
  },
});

export default MySlider;
