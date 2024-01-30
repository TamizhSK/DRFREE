import React, { useRef } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Animated , TouchableOpacity, Linking } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';

const BANNER_H = 460;

const Addversedrug = ({ navigation }) => {
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
                        <Text style={styles.logo}>Adverse EDU</Text>
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
                    source={{ uri: Asset.fromModule(require('../../assets/AddverseEdu1.jpg')).uri }}
                    style={[styles.headerImage, { transform: [{ translateY: scrollY }] }]}
                />
                {/* Your content goes here */}
                <View style={styles.overlay} />
                <View style={styles.backgroundset}>
                <Text style={styles.sectionTitle}>ADVERSE EFFECTS OF DRUGS</Text>

                {/* Alcohol */}
                <Text style={styles.subTitle}>ALCOHOL:</Text>
                <Text style={styles.categoryTitle}>1. Short-term effects:</Text>
                <Text style={styles.effectText}>
        a. Impaired judgment and coordination.{"\n"}
        b. Slurred speech.{"\n"}
        c. Euphoria and relaxation.{"\n"}
        d. Increased sociability.{"\n"}
        e. Reduced inhibitions.{"\n"}
        f. Nausea and vomiting.{"\n"}
        g. Memory blackouts.{"\n"}
        h. Hangover symptoms (headache, dehydration, fatigue) after the effects wear off.{"\n"}
        i. Risk of accidents, including drunk driving.
    </Text>
    <Image style={styles.InImage} source={{ uri: Asset.fromModule(require('../../assets/long and short term.jpg')).uri }}
    />
    {/* Long-term effects */}
    <Text style={styles.categoryTitle}>2. Long-term effects:</Text>
    <Text style={styles.effectText}>
        a. Physical dependence and withdrawal symptoms (e.g., tremors, seizures).{"\n"}
        b. Liver damage (e.g., cirrhosis).{"\n"}
        c. Increased risk of certain cancers (e.g., mouth, throat, liver).{"\n"}
        d. Heart problems (e.g., high blood pressure, cardiomyopathy).{"\n"}
        e. Brain damage and cognitive impairments.{"\n"}
        f. Mental health issues (e.g., depression, anxiety).{"\n"}
        g. Relationship problems and social isolation.{"\n"}
        h. Legal consequences (e.g., DUI, public intoxication).{"\n"}
        i. Financial problems due to addiction.
    </Text>

   {/* Common Drug Categories */}
   <Text style={styles.subTitle}>Common Drug Categories (Short-term and Long-term effects):</Text>

{/* Stimulants */}
<Text style={styles.categoryTitle}>1. Stimulants (e.g., cocaine, amphetamines):</Text>
<Text style={styles.effectText}>
    a. Short-term effects:{"\n"}
    - Increased alertness and energy.{"\n"}
    - Euphoria and increased confidence.{"\n"}
    - Reduced appetite.{"\n"}
    - Increased heart rate and blood pressure.{"\n"}
    - Agitation and anxiety.{"\n"}
    b. Long-term effects:{"\n"}
    - Addiction and withdrawal symptoms.{"\n"}
    - Cardiovascular problems.{"\n"}
    - Psychiatric disorders (e.g., paranoia, hallucinations).{"\n"}
    - Risky behaviors.{"\n"}
    - Legal issues.
</Text>
<TouchableOpacity
    activeOpacity={0.8}
    onPress={() => Linking.openURL('https://youtu.be/NxHNxmJv2bQ?si=OIvHLn_WxFdzEZrh')}
>
    <Image
        style={styles.InImage}
        source={{ uri: Asset.fromModule(require('../../assets/long and short term2.jpg')).uri }}
    />
</TouchableOpacity>
{/* Depressants */}
<Text style={styles.categoryTitle}>2. Depressants (e.g., benzodiazepines, barbiturates):</Text>
<Text style={styles.effectText}>
    a. Short-term effects:{"\n"}
    - Sedation and relaxation.{"\n"}
    - Reduced anxiety and muscle tension.{"\n"}
    - Impaired coordination and judgment.{"\n"}
    b. Long-term effects:{"\n"}
    - Tolerance and dependence.{"\n"}
    - Memory problems.{"\n"}
    - Respiratory depression (dangerous if taken in excess).{"\n"}
    - Withdrawal symptoms.{"\n"}
    - Overdose risk.
</Text>

{/* Opioids */}
<Text style={styles.categoryTitle}>3. Opioids (e.g., heroin, prescription painkillers):</Text>
<Text style={styles.effectText}>
    a. Short-term effects:{"\n"}
    - Pain relief.{"\n"}
    - Euphoria and drowsiness.{"\n"}
    - Nausea and constipation.{"\n"}
    b. Long-term effects:{"\n"}
    - Physical and psychological dependence.{"\n"}
    - Overdose risk.{"\n"}
    - Increased sensitivity to pain.{"\n"}
    - Respiratory depression and potential death.{"\n"}
    - Infectious diseases (e.g., HIV, hepatitis) through shared needles.
</Text>

{/* Hallucinogens */}
<Text style={styles.categoryTitle}>4. Hallucinogens (e.g., LSD, magic mushrooms):</Text>
<Text style={styles.effectText}>
    a. Short-term effects:{"\n"}
    - Altered perceptions (hallucinations).{"\n"}
    - Intensified emotions.{"\n"}
    - Distorted sense of time and reality.{"\n"}
    b. Long-term effects:{"\n"}
    - Flashbacks.{"\n"}
    - Psychological distress.{"\n"}
    - Risk of accidents while under the influence.{"\n"}
    - Tolerance and potential for adverse reactions.
</Text>

    <Text style={styles.contentText}>
        It's important to remember that substance use and its effects can vary greatly from person to person, and the consequences can be severe. Seeking help from healthcare professionals, support groups, or addiction treatment programs is essential for individuals struggling with substance abuse. Additionally, many countries have strict laws regulating the use and possession of certain substances, so legal consequences are a concern as well.
    </Text>
                </View>

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
        backgroundColor: '#fff',
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
        height: 210,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    InImage: {
            width: '80%',
            height: 150,
            borderRadius: 10,
            margin: 20,
            alignItems: "center",    },
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

export default Addversedrug;

Addversedrug.navigationOptions = {
    headerMode: "none",
};
