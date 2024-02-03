import React, { useContext, useRef } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Animated , TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';
import { AuthContext } from '../../context/AuthContext';

const BANNER_H = 460;

const Addversedrug = ({ navigation }) => {
  const {user} = useContext(AuthContext);
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
                        <Text style={styles.logo}>Adverse EDU</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.userContainer}>
                    {/* Add the user's profile picture and name */}
                    <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto} />
                    <Text style={styles.userName}>{user?.username}</Text>
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
                
  <Text style={styles.sectionTitle}>THE HILARIOUS REALITY OF SUBSTANCES</Text>

  <Text style={styles.effectText}>
    Welcome to the comedic carnival of substance shenanigans! Grab your popcorn (not the illegal stuff), and let's dive into the sidesplitting world of the Adverse Effects of Drugs.
  </Text>

  {/* Interview Videos Section */}
  <Text style={styles.subTitle}>Inside Scoop: Unfiltered Interviews</Text>
  <Text style={styles.effectText}>
    Ever wondered what substances have to say for themselves? Check out these hilarious interviews where drugs spill the beans on their wild adventures. Spoiler: They might be too high to remember!
  </Text>
  {/* Insert links to quirky interviews that spill the beans on the substances' wild adventures */}

  {/* Alcohol Section */}
  <Text style={styles.subTitle}>ALCOHOL:</Text>
  <Text style={styles.categoryTitle}>1. Short-term effects:</Text>
<Text style={styles.effectText}>
<Text style={styles.bolding}>a.</Text> Impaired judgment and coordination – Trying to dance like Beyoncé, ending up more like a drunk flamingo.
  {"\n"}  {"\n"}<Text style={styles.bolding}>b.</Text> Slurred speech – Sounding like you've adopted a new language, "Gibberishese."
  {"\n"}  {"\n"}<Text style={styles.bolding}>c.</Text> Euphoria and relaxation – The delightful feeling of becoming the world's clumsiest yoga master.
  {"\n"}  {"\n"}<Text style={styles.bolding}>d.</Text> Increased sociability – Suddenly thinking you're the life of the party, but everyone else just hopes you'll leave.
  {"\n"}  {"\n"}<Text style={styles.bolding}>e.</Text> Reduced inhibitions – Deciding it's an excellent time to share your shower singing talent with the entire bar.
  {"\n"}  {"\n"}<Text style={styles.bolding}>f.</Text> Nausea and vomiting – Achieving a new level of intimacy with the porcelain throne.
  {"\n"}  {"\n"}<Text style={styles.bolding}>g.</Text> Memory blackouts – Playing detective to find out what you did last night. Spoiler: It's never as cool as you think.
  {"\n"}  {"\n"}<Text style={styles.bolding}>h.</Text> Hangover symptoms – The morning after feels like the universe is punishing you for your dance moves.
  {"\n"}  {"\n"}<Text style={styles.bolding}>i.</Text> Risk of accidents, including drunk driving – Turns out, your car isn't a bumper car, who knew?
</Text>
<Image style={styles.InImage} source={require('../../assets/funnyAlcohol.jpeg')} />
</View>
<View style={{height: 35}}/>
<View style={styles.backgroundset}>
  {/* Long-term effects */}
  <Text style={styles.categoryTitle}>2. Long-term effects:</Text>
  <Text style={styles.effectText}>
  <Text style={styles.bolding}>a.</Text> Physical dependence and withdrawal symptoms – Discovering your body has a serious case of FOMO without substances.
    {"\n"} {"\n"}<Text style={styles.bolding}>b.</Text> Liver damage – Your liver filing a complaint for overworking and throwing tantrums.
    {"\n"} {"\n"}<Text style={styles.bolding}>c.</Text> Increased risk of certain cancers – Because why not add a plot twist to life?
    {"\n"}  {"\n"}<Text style={styles.bolding}>d.</Text> Heart problems – Your heart having trust issues after the rollercoaster of emotions.
    {"\n"}  {"\n"}<Text style={styles.bolding}>e.</Text> Brain damage and cognitive impairments – Realizing you've become the star of your very own sitcom, "The Forgetful Years."
    {"\n"}  {"\n"}<Text style={styles.bolding}>f.</Text> Mental health issues – Congratulations! You've unlocked the anxiety and depression level.
    {"\n"}  {"\n"}<Text style={styles.bolding}>g.</Text> Relationship problems and social isolation – Turns out, not everyone appreciates your newfound party tricks.
    {"\n"}  {"\n"}<Text style={styles.bolding}>h.</Text> Legal consequences – Collecting a series of 'Oops, I did it again' moments.
    {"\n"}  {"\n"}<Text style={styles.bolding}>i.</Text> Financial problems due to addiction – Your wallet doing a disappearing act faster than a magician on caffeine.
  </Text>

  {/* Common Drug Categories Section */}
  <Text style={styles.subTitle}>Common Drug Categories (Short-term and Long-term effects):</Text>

  {/* Stimulants Section */}
  <Text style={styles.categoryTitle}>1. Stimulants (e.g., caffeine, amphetamines):</Text>
  <Text style={styles.categoryTitle}>a. Short-term effects:</Text>
  <Text style={styles.effectText}>
    <Text style={styles.bolding}>#</Text> Increased alertness and energy – Pretending you're the Flash, but in reality, you're just vibrating with caffeine.
    {"\n"} {"\n"}<Text style={styles.bolding}>#</Text> Euphoria and increased confidence – Suddenly thinking you're the next top model in your living room fashion show.
    {"\n"} {"\n"}<Text style={styles.bolding}>#</Text> Reduced appetite – Claiming you're on a new diet called "Chasing the Caffeine High."
    {"\n"} {"\n"}<Text style={styles.bolding}>#</Text> Increased heart rate and blood pressure – Feeling like you just ran a marathon, even though you only climbed a flight of stairs.
    {"\n"} {"\n"}<Text style={styles.bolding}>#</Text> Agitation and anxiety – Because who needs calm when you can be a jittery ball of nerves?
    {"\n"} {"\n"}
    </Text>
    </View>
<View style={{height: 35}}/>
<View style={styles.backgroundset}>
    <Text style={styles.categoryTitle}>b. Long-term effects:</Text>
    <Text style={styles.effectText}>
    <Text style={styles.bolding}>#</Text> Addiction and withdrawal symptoms – Your body throwing a tantrum without its daily caffeine dose.
    {"\n"}  {"\n"}<Text style={styles.bolding}>#</Text> Cardiovascular problems – Your heart getting a workout it never signed up for.
    {"\n"}  {"\n"}<Text style={styles.bolding}>#</Text> Psychiatric disorders – Congratulations, you're now a character in your very own caffeine-induced thriller.
    {"\n"}  {"\n"}<Text style={styles.bolding}>#</Text> Risky behaviors – Deciding it's a brilliant idea to challenge a cheetah to a race.
    {"\n"}  {"\n"}<Text style={styles.bolding}>#</Text> Legal issues – Turns out, sprinting down the highway in your pajamas is frowned upon.
  </Text>
  <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/d6Dzm2hsm8s?si=ifLJXJ9LyPqCIbRC')}>
    <Image style={styles.InImage} source={require('../../assets/nodrugvid.jpg')} />
  </TouchableOpacity>

  {/* Depressants Section */}
  <Text style={styles.categoryTitle}>2. Depressants (e.g., benzodiazepines, barbiturates):</Text>
  <Text style={styles.categoryTitle}>a. Short-term effects:</Text>
  <Text style={styles.effectText}>
  <Text style={styles.bolding}>1.</Text> Sedation and relaxation – Congratulations, you've mastered the art of napping at inappropriate times.
    {"\n"} {"\n"}<Text style={styles.bolding}>2.</Text> Reduced anxiety and muscle tension – Becoming the Zen master of your own living room.
    {"\n"} {"\n"}<Text style={styles.bolding}>3.</Text> Impaired coordination and judgment – Walking like you've just conquered Mount Everest, even though it's just your stairs.
    {"\n"}  {"\n"}
    </Text>
    <Text style={styles.categoryTitle}>b. Long-term effects:</Text>
  <Text style={styles.effectText}>
  <Text style={styles.bolding}>1.</Text> Tolerance and dependence – Your body demanding a constant supply of chill pills.
    {"\n"} {"\n"}<Text style={styles.bolding}>2.</Text> Memory problems – Losing track of where you left your keys, your phone, and possibly your sanity.
    {"\n"} {"\n"}<Text style={styles.bolding}>3.</Text> Respiratory depression – Discovering the unexpected talent of challenging sloths to a breathing contest.
    {"\n"}  {"\n"}<Text style={styles.bolding}>4.</Text> Withdrawal symptoms – Your body throwing a 'where's my calm?' fit.
    {"\n"} {"\n"}<Text style={styles.bolding}>5.</Text> Overdose risk – Learning that moderation is the key, especially with substances.
  </Text>
  <Image style={styles.InImage} source={ require('../../assets/opioids.jpg') } />
  </View>
<View style={{height: 35}}/>
<View style={styles.backgroundset}>
  {/* Opioids Section */}
  <Text style={styles.categoryTitle}>3. Opioids (e.g., heroin, prescription painkillers):</Text>
  <Text style={styles.categoryTitle}>a. Short-term effects:</Text>
  <Text style={styles.effectText}>
  <Text style={styles.bolding}>1.</Text> Pain relief – Because who needs pain when you can have a temporary vacation from reality?
    {"\n"} {"\n"}<Text style={styles.bolding}>2.</Text> Euphoria and drowsiness – Napping through life, one opioid-induced dream at a time.
    {"\n"} {"\n"}<Text style={styles.bolding}>3.</Text> Nausea and constipation – Because nothing says 'fun' like a surprise stomach rollercoaster.
    {"\n"} {"\n"}</Text>
    <Text style={styles.categoryTitle}>b. Long-term effects:</Text>
    <Text style={styles.effectText}>
    <Text style={styles.bolding}>1.</Text>  Physical and psychological dependence – Your body throwing a tantrum without its daily dose of 'happy pills.'
    {"\n"} {"\n"}<Text style={styles.bolding}>2.</Text>  Overdose risk – Realizing that life is not a game, and you can't hit the 'undo' button.
    {"\n"}  {"\n"}<Text style={styles.bolding}>3.</Text>  Increased sensitivity to pain – Congratulations, you've unlocked the 'Pain Level: Expert.'
    {"\n"}  {"\n"}<Text style={styles.bolding}>4.</Text>  Respiratory depression – Practicing the art of breath-holding like an underwater escape artist.
    {"\n"}  {"\n"}<Text style={styles.bolding}>5.</Text>  Infectious diseases – Sharing needles is like playing Russian Roulette, but with more regret.
  </Text>
  <Image style={styles.InImage} source={require('../../assets/opd.jpg')} />
  </View>
<View style={{height: 35}}/>
<View style={styles.backgroundset}>
  {/* Hallucinogens Section */}
  <Text style={styles.categoryTitle}>4. Hallucinogens (e.g., LSD, magic mushrooms):</Text>
  <Text style={styles.categoryTitle}>a. Short-term effects:</Text>
  <Text style={styles.effectText}>
  <Text style={styles.bolding}>1.</Text> Altered perceptions (hallucinations) – Seeing the world in a whole new light, mainly because you mistook a streetlamp for the moon.
    {"\n"} {"\n"}<Text style={styles.bolding}>2.</Text> Intensified emotions – Crying over the beauty of a peanut butter and jelly sandwich.
    {"\n"} {"\n"}<Text style={styles.bolding}>3.</Text> Distorted sense of time and reality – Time becomes a social construct, and reality is just a suggestion.
    {"\n"}  {"\n"}</Text>
    <Text style={styles.categoryTitle}>b. Long-term effects:</Text>
    <Text style={styles.effectText}>
    <Text style={styles.bolding}>1.</Text> Flashbacks – Reliving that one time you thought your pet goldfish was a secret agent.
    {"\n"}  {"\n"}<Text style={styles.bolding}>2.</Text> Psychological distress – Trying to explain your profound mushroom-induced revelations to your skeptical cat.
    {"\n"} {"\n"}<Text style={styles.bolding}>3.</Text> Risk of accidents – Attempting to fly off the rooftop because you're convinced you've developed superpowers.
    {"\n"} {"\n"}<Text style={styles.bolding}>4.</Text> Tolerance and potential for adverse reactions – Realizing that the universe has a 'mute' button for your deep thoughts.
  </Text>

  {/* Conclusion and Resources */}
  <Text style={styles.contentText}>
    Life is already a stand-up comedy show; no need for substances to steal the spotlight. If the laughter fades and you or a friend need support, reach out to the real-life superheroes – the professionals ready to save the day!
  </Text>
  </View>
<View style={{height: 35}}/>
<View style={styles.backgroundset}>
  {/* External Resources */}
  <Text style={styles.subTitle}>Keep Laughing, Stay Safe</Text>
  <Text style={styles.effectText}>
    For a dose of real laughter, check out these resources:
    {"\n"} {"\n"} - HSNCB Madhuban, Haryana : +91-90508-91508
  </Text>
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
        paddingTop: 0,
        marginBottom:0,
    },
    bolding:{
        fontWeight: "bold",
    },
    topNavbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingTop: 10,
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
        margin: 7,
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
        height: 260,
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
