import React, { useRef } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Animated , TouchableOpacity, Linking } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';

const BANNER_H = 460;

const EduHelp = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const translateY = scrollY.interpolate({
        inputRange: [0, BANNER_H],
        outputRange: [0, -BANNER_H],
        extrapolate: 'clamp',
      });
    
    return (
        <View style={styles.container}>
            {/* Top Navbar */}
            <View style={styles.topNavbar}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.back}>
                        <Text style={styles.backButton}>{'◀︎'}</Text>
                        <Text style={styles.logo}>Addiction Help</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.userContainer}>
                    {/* Add the user's profile picture and name */}
                    <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
                    <Text style={styles.userName}>Dhejan</Text>
                </View>
            </View>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                style={styles.scrollView}
            >
                <Animated.Image
                    source={{ uri: Asset.fromModule(require('../../assets/addictionhelp.jpeg')).uri }}
                    style={[styles.headerImage, { transform: [{ translateY: scrollY }] }]}
                />
                {/* Your content goes here */}
                <View style={styles.overlay} />
                <View style={styles.backgroundset}>
                <Text style={styles.sectionTitle}>ADDICTION HELP</Text>

      {/* Introduction */}
      <Text style={styles.contentText}>
        Welcome to the Addiction Help page, a dedicated space providing valuable resources and support for individuals dealing with addiction.
      </Text>

      {/* Understanding Addiction */}
      <Text style={styles.sectionTitle}>UNDERSTANDING ADDICTION</Text>
      <Text style={styles.contentText}>
        Addiction is a complex condition affecting both the brain and behavior. It is characterized by an inability to control or stop substance use despite harmful consequences, impacting physical health, mental well-being, and relationships.
      </Text>

      {/* Signs of Addiction */}
      <Text style={styles.sectionTitle}>SIGNS OF ADDICTION</Text>
      <Text style={styles.contentText}>
        Recognizing the signs of addiction is crucial for seeking help. Look out for changes in behavior and priorities, physical symptoms such as changes in sleep patterns or weight loss, loss of interest in once enjoyed activities, and continued substance use despite negative consequences.
      </Text>
      </View>
                    <View style={{height: 35}}/>
                    <View style={styles.backgroundset}>
      {/* Getting Help */}
      <Text style={styles.sectionTitle}>GETTING HELP</Text>
      <Text style={styles.contentText}>
        Seeking help is a courageous decision. Consider the following steps:
      </Text>
      <Text style={styles.listItem}>1. Talk to a Healthcare Professional: Consult with a doctor, therapist, or addiction specialist for guidance and support.</Text>
      <Text style={styles.listItem}>2. Support Groups: Join support groups like Alcoholics Anonymous (AA) or Narcotics Anonymous (NA) for a sense of community and understanding.</Text>
      <Text style={styles.listItem}>3. Therapy and Counseling: Individual or group therapy can address underlying issues contributing to addiction.</Text>
      <Text style={styles.listItem}>4. Rehabilitation Centers: Inpatient or outpatient treatment programs offer structured support for recovery.</Text>
      </View>
                    <View style={{height: 35}}/>
                    <View style={styles.backgroundset}>
      {/* Helpline and Support */}
      <Text style={styles.sectionTitle}>HELPLINE AND SUPPORT</Text>
      <Text style={styles.contentText}>
        # National Helpline: 1800-11-0031{"\n"}
        # Local Addiction Support Centers: 
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('RehabPage')}>
                        <Image style={styles.sectionImage} source={require('../../assets/rehabpagenav.jpg')} />
                        <Text style={styles.linkText}>Visit DR Free Rehab page by clicking image!</Text>
                    </TouchableOpacity>

      {/* Success Stories */}
      <Text style={styles.sectionTitle}>SUCCESS STORIES</Text>
      <Text style={styles.contentText}>
        Read inspiring stories of individuals who successfully overcame addiction. These stories provide hope and motivation for your journey to recovery.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Story')}>
                        <Image style={styles.sectionImage} source={require('../../assets/storyPagenav.jpg')} />
                        <Text style={styles.linkText}>Visit DR Free Stories by clicking image!</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{height: 35}}/>
                    <View style={styles.backgroundset}>
      {/* Educational Videos */}
      <Text style={styles.sectionTitle}>EDUCATIONAL VIDEOS</Text>
      <Text style={styles.contentText}>
        Explore videos explaining the science behind addiction, the recovery process, and personal testimonials.
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=J11rcoORHBU')}>
                        <Image style={styles.sectionImage} source={require('../../assets/eduVid.jpg')} />
                        <Text style={styles.linkText}>Visit youtube video by clicking image!</Text>
                    </TouchableOpacity>
    </View>
    <View style={{height: 65}}/>

            </Animated.ScrollView>
            {/* Bottom Navbar */}
            <BottomNavbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
        margin: 10,
        paddingTop: 0,
        marginBottom:0,
    },
    topNavbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingTop: 35,
        paddingBottom: 15,
        borderBottomColor: '#ddd',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
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
        color: '#000',
    },
    scrollView: {
        backgroundColor: '#F1EEEE',
    },
    back:{
        flexDirection: 'row',
      alignItems: 'center',
      },
      backButton:{
        fontSize: 25,
        paddingBottom: 5,
      },
    headerImage: {
        width: '100%',
        height: 240,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    sectionImage: {
        width: '80%',
        height: 150,
        borderRadius: 10,
        margin: 20,
        alignItems: "center",    
    },
    linkText:{
        marginBottom: 4,
        paddingTop: 0,
        alignItems: "center",
        paddingLeft: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundset:{
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: "#fff",
        margin: 10,
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: "#fff",
        margin: 10,
    },

    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        margin: 10,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        margin: 10,
        paddingLeft: 7,
    },
    effectText: {
        fontSize: 14,
        marginBottom: 5,
        margin: 10,
        paddingLeft: 14,
    },
    contentText: {
        fontSize: 14,
        marginBottom: 5,
        margin: 10,
        paddingLeft: 14,
    },

    listItem: {
        fontSize: 14,
        marginLeft: 16,
        marginBottom: 4,
      },
    bottomNavbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navItemText: {
        marginLeft: 15,
    },
});

export default EduHelp;

EduHelp.navigationOptions = {
    headerMode: "none",
};
