import React, { useRef, useContext } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Animated, TouchableOpacity, Linking , SafeAreaView} from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';
import { AuthContext } from '../../context/AuthContext';

const BANNER_H = 460;

const LegalConsequencesPage = ({ navigation }) => {
    const{user} = useContext(AuthContext);
    const scrollY = useRef(new Animated.Value(0)).current;
    const translateY = scrollY.interpolate({
        inputRange: [0, BANNER_H],
        outputRange: [0, -BANNER_H],
        extrapolate: 'clamp',
      });
    return (
        <SafeAreaView style = {styles.container}>
        <View style={styles.container}>
            {/* Top Navbar */}
            <View style={styles.topNavbar}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.back}>
                        <Text style={styles.backButton}>{'◀︎'}</Text>
                        <Text style={styles.logo}>Legal Consequnce</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.userContainer}>
                    {/* Add the user's profile picture and name */}
                    <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
                    <Text style={styles.userName}>{user.username}</Text>
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
                    source={{ uri: Asset.fromModule(require('../../assets/LegalConsequnce.jpg')).uri }}
                    style={[styles.headerImage, { transform: [{ translateY: scrollY }] }]}
                />
                {/* Your content goes here */}
                <View style={styles.overlay} />
                <View style={styles.backgroundset}>
                    {/* Section 1: Narcotic Drugs and Psychotropic Substances Act, 1985 */}
                    <Text style={styles.subTitle}>Narcotic Drugs and Psychotropic Substances Act, 1985:</Text>
                    <Text style={styles.sectionText}>
                        The primary legislation in India that deals with drug abuse and trafficking.
                        It classifies and regulates operations relating to narcotic drugs and psychotropic substances.
                        Offenses under this act can lead to severe legal consequences, including imprisonment and fines.
                    </Text>
                    {/* You can add images, videos, or links related to this section */}
                    <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/2dQdnfXl_zo?si=C-v3ikNnaoDFdYe2')}>
                        <Image style={styles.sectionImage} source={require('../../assets/ndps_act1.jpg')} />
                        <Text style={styles.linkText}>Click image to learn more</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{height: 35}}/>
                    <View style={styles.backgroundset}>

                    {/* Section 2: Prevention of Illicit Traffic in Narcotic Drugs and Psychotropic Substances Act, 1988 */}
                    <Text style={styles.subTitle}>Prevention of Illicit Traffic in Narcotic Drugs and Psychotropic Substances Act, 1988:</Text>
                    <Text style={styles.sectionText}>
                        This act focuses on preventing illicit trafficking of narcotic drugs and psychotropic substances.
                        It provides for the control and regulation of operations relating to precursor chemicals used in the production of drugs.
                        Individuals involved in illicit trafficking can face stringent legal actions.
                    </Text>
                    {/* You can add images, videos, or links related to this section */}
                    <TouchableOpacity onPress={() => Linking.openURL('https://narcoticsindia.nic.in/')}>
                        <Image style={styles.sectionImage} source={require('../../assets/narcoticsCB.jpg')} />
                        <Text style={styles.linkText}>Learn more on India.gov.in</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{height: 35}}/>
                    <View style={styles.backgroundset}>
                    {/* Section 3: Indian Penal Code (IPC) */}
                    <Text style={styles.subTitle}>Indian Penal Code (IPC):</Text>
                    <Text style={styles.sectionText}>
                        Various sections of the IPC deal with offenses related to drug abuse, such as possession, consumption, and trafficking.
                        Click image to learn Indian Laws
                    </Text>
                    {/* You can add images, videos, or links related to this section */}
                    <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/E_9pqkDLku0?si=nKOdf0uJNhbjcE7m')}>
                        <Image style={styles.sectionImage} source={require('../../assets/indian_penal_law.jpg')} />
                        <Text style={styles.linkText}>Click image to learn more</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{height: 35}}/>
                    <View style={styles.backgroundset}>
                    {/* Section 3: Indian Penal Code (IPC) */}
                    <Text style={styles.subTitle}>Indian Penal Code (IPC):</Text>
                    <Text style={styles.sectionText}>
                        Various sections of the IPC deal with offenses related to drug abuse, such as possession, consumption, and trafficking.
                        Penalties under the IPC can include imprisonment, fines, and community service.
                    </Text>
                    {/* You can add images, videos, or links related to this section */}
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.indiacode.nic.in/show-data?actid=AC_CEN_12_13_00023_194023_1523353460112&sectionId=27647&sectionno=27&orderno=43')}>
                        <Image style={styles.sectionImage} source={require('../../assets/indian_penal_code.jpg')} />
                        <Text style={styles.linkText}>Read the Indian Penal Code</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{height: 35}}/>
                    <View style={styles.backgroundset}>
                    {/* Section 4: State-Specific Laws */}
                    <Text style={styles.subTitle}>State-Specific Laws:</Text>
                    <Text style={styles.sectionText}>
                        Some states in India may have additional laws and regulations related to drug use and trafficking.
                        It's crucial to be aware of and comply with both national and state-level laws.
                    </Text>
                    {/* You can add images, videos, or links related to this section */}
                    {/* Example: Image for Maharashtra state */}
                    <TouchableOpacity onPress={() => Linking.openURL('https://ncbharyana.in/')}>
                        <Image style={styles.sectionImage} source={require('../../assets/haryana_narcotics_bureau1.jpg')} />
                        <Text style={styles.linkText}>Visit NCBHaryana Website</Text>
                    </TouchableOpacity>

                    {/* You can add more sections as needed */}

                </View>
                <View style={{height: 65}}/>
            </Animated.ScrollView>

            {/* Bottom Navbar */}
            <BottomNavbar navigation={navigation} />
        </View>
        </SafeAreaView>
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
        padding: 7,
        paddingTop: 35,
        paddingBottom : 15,
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

export default LegalConsequencesPage;

LegalConsequencesPage.navigationOptions = {
    headerMode: "none",
};
