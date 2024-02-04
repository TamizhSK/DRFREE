// screens/HomeScreen.js
import React ,{useState, useEffect, useContext}from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import { Asset } from 'expo-asset';
import BottomNavbar from '../components/BottomNavbar';
import { Ionicons } from '@expo/vector-icons';
import {BASEURL} from '@env';
import { AuthContext } from '../../context/AuthContext';
import DocHomeScreen from './DocHomeScreen';
import CreditsPage from './CreditsPage';


const HomeScreen = ({ navigation }) => {
  const {test, user, usertype, token, logout} = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState(null);
  const [refresh, setRefresh] = useState(false);
  // window.reload;
  const handleserver = async() => {
    try {
      console.log("first-client");
      const res = await fetch("https://dr-free-server.onrender.com/api/get");
      const data = await res.json();
      console.log(user);
      console.log(data.message);
    } catch (error) {
      console.log("first", error);
    }
  };

    const handleButtonPress = (buttonName) => {
      setActiveButton(buttonName);
      // Add logic for handling button press (if needed)
  
      // Add logic to change the button color on press
      switch (buttonName) {
        case 'Doctors':
          navigation.navigate('DocHomeScreen');
          // handleserver();
          break;
        case 'RehabCenter':
          navigation.navigate('RehabCenter');
          break;
        case 'Helpline':
          navigation.navigate('HelpLine');
          break;
        case 'Community':
          navigation.navigate('Community');
          break;
        case 'EducationOfDrug':
          navigation.navigate('EducationOfDrug');
          break;
        case 'AiChatbot':
          navigation.navigate('AiChatbot');
          break;
        case 'Activate':
          navigation.navigate('Activate');
          break;
        case 'Story':
          navigation.navigate('Story');
          break;
        default:
          break;
      }
  
      // Add navigation logic here if needed
    };
    setTimeout(() => {
        setActiveButton(null);
      }, 50);
  const [likes, setLikes] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: prevLikes[postId] + 1,
    }));
  };
  const pp = [   
    { id: 1, user: { name: 'Dhejan', photoUrl: Asset.fromModule(require('../../assets/profile.jpeg')).uri }, content: 'Post 1', imageUrl:Asset.fromModule(require('../../assets/post1.jpeg')).uri, caption: 'Promoting a drug-free lifestyle.' },
    { id: 2, user: { name: 'Jane Smirithy', photoUrl: Asset.fromModule(require('../../assets/profile2.jpeg')).uri  }, content: 'Post 2', imageUrl: Asset.fromModule(require('../../assets/post3.jpeg')).uri, caption: 'Choose a healthy and drug-free life.' },
    { id: 3, user: { name: 'Jawagal', photoUrl: Asset.fromModule(require('../../assets/profile4.jpeg')).uri  }, content: 'Post 3', imageUrl:Asset.fromModule(require('../../assets/post2.jpeg')).uri, caption: 'Join the movement for a drug-free society.' },
    // Add more posts
    { id: 4, user: { name: 'Alice Williams', photoUrl:Asset.fromModule(require('../../assets/profile3.jpeg')).uri  }, content: 'Post 4', imageUrl: Asset.fromModule(require('../../assets/post4.jpeg')).uri, caption: 'Say no to drugs!' },
    { id: 5, user: { name: 'Madhan', photoUrl:Asset.fromModule(require('../../assets/profile5.jpeg')).uri }, content: 'Post 5', imageUrl: Asset.fromModule(require('../../assets/post5.jpeg')).uri, caption: 'Living a drug-free lifestyle.' },
  ];
  
  const [posts, setPosts] = useState([
    { id: 1, user: { name: 'Dhejan', photoUrl: Asset.fromModule(require('../../assets/profile.jpeg')).uri }, content: 'Post 1', imageUrl:Asset.fromModule(require('../../assets/post1.jpeg')).uri, caption: 'Promoting a drug-free lifestyle.' },
    { id: 2, user: { name: 'Jane Smirithy', photoUrl: Asset.fromModule(require('../../assets/profile2.jpeg')).uri  }, content: 'Post 2', imageUrl: Asset.fromModule(require('../../assets/post3.jpeg')).uri, caption: 'Choose a healthy and drug-free life.' },
    { id: 3, user: { name: 'Jawagal', photoUrl: Asset.fromModule(require('../../assets/profile4.jpeg')).uri  }, content: 'Post 3', imageUrl:Asset.fromModule(require('../../assets/post2.jpeg')).uri, caption: 'Join the movement for a drug-free society.' },
    // Add more posts
    { id: 4, user: { name: 'Alice Williams', photoUrl:Asset.fromModule(require('../../assets/profile3.jpeg')).uri  }, content: 'Post 4', imageUrl: Asset.fromModule(require('../../assets/post4.jpeg')).uri, caption: 'Say no to drugs!' },
    { id: 5, user: { name: 'Madhan', photoUrl:Asset.fromModule(require('../../assets/profile5.jpeg')).uri }, content: 'Post 5', imageUrl: Asset.fromModule(require('../../assets/post5.jpeg')).uri, caption: 'Living a drug-free lifestyle.' },
  ]);
  
  
  // const baseUrl = BASEURL || "http://192.168.25.141:6969";
  
  const fetchData = async() => {
    setRefresh(true);
    console.log(BASEURL);
    const res = await fetch(BASEURL+'/api/post/posts');
    if(!res.ok){
      setPosts(pp);
    }
    const data = await res.json();
    // console.log(data);
    const allposts = data.map((d)=> {
      return{
        id : d._id,
        user: { name: d.username, usertype: d.usertype, photoUrl: Asset.fromModule(require('../../assets/profile.jpeg')).uri },
        content: d.caption,
        imageUrl: d.postImage,
        caption: d.caption,
      }
    })
    const ap = allposts.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1);
    setPosts(ap);
    setRefresh(false);
  }
  const handleLogout = async() => {
    await logout();
  }
  
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <SafeAreaView style = {styles.container}>

   
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.topNavbar}>
      <TouchableOpacity
          onPress={() => navigation.navigate('CreditsPage')}
        > 
          <Text style={styles.logo}>DR Free</Text>
         </TouchableOpacity> 
        <View style={styles.userContainer}>
          {/* Add the user's profile picture and name */}
          <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate('CreatePost')}
          >
            <Text style={styles.createPostButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Image source={{ uri: Asset.fromModule(require('../../assets/profile.jpeg')).uri }} style={styles.userPhoto}/>
            </TouchableOpacity>
            <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          >
          <Text style={styles.userName}>{user?.username}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} 
      refreshControl={<RefreshControl refreshing={refresh} onRefresh={()=>fetchData()}/>}>

        <ScrollView
      horizontal
      contentContainerStyle={styles.buttonContainer}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'Doctors' && { backgroundColor: '#E16721CC' },
        ]}
        onPress={() => handleButtonPress('Doctors')}
      >
        <Text style={styles.buttonText}>Connections</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'RehabCenter' && { backgroundColor: '#E16721CC' },
        ]}
        onPress={() => handleButtonPress('RehabCenter')}
      >
        <Text style={styles.buttonText}>Rehab Center</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'Helpline' && { backgroundColor: '#E16721CC' },
        ]}
        onPress={() => handleButtonPress('Helpline')}
      >
        <Text style={styles.buttonText}>Helpline</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'Community' && { backgroundColor: '#E16721CC' },
        ]}
        onPress={() => handleButtonPress('Community')}
      >
        <Text style={styles.buttonText}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'EducationOfDrug' && { backgroundColor: '#E16721CC' },
        ]}
        onPress={() => handleButtonPress('EducationOfDrug')}
      >
        <Text style={styles.buttonText}>Education</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'AiChatbot' && { backgroundColor: '#E16721CC' },
        ]}
        onPress={() => handleButtonPress('AiChatbot')}
      >
        <Text style={styles.buttonText}>Gusto AI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'Activate' && { backgroundColor: '#E16721CC' },
        ]}
        onPress={() => handleButtonPress('Activate')}
      >
        <Text style={styles.buttonText}>Quizzy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          activeButton === 'Story' && { backgroundColor: '#E16721CC' },
        ]}
        onPress={() => handleButtonPress('Story')}
      >
        <Text style={styles.buttonText}>Stories</Text>
      </TouchableOpacity>
      
    </ScrollView>
        
        <View style={styles.pad}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.postContainer}
            // onPress={() => navigation.navigate('PostDetail', { post })}
          >
            <View style={styles.postUserContainer}>
              <Image source={{ uri: post.user.photoUrl }} style={styles.postUserPhoto} />
              <Text style={styles.postUserName}>{post.user.name}</Text>
              {(post.user.usertype==='doc') && <Image
                  source={require('../../assets/verification.png')} // Adjust the path based on your project structure
                  style={styles.verificationIcon}
              />}
            </View>
            <Image source={{ uri: `data:image/jpeg;base64,${post.imageUrl}`}} style={styles.postImage} />
            <Text style={styles.postCaption}>{post.caption}</Text>
    {/* Footer */}
    <View style={styles.footer}>
      <TouchableOpacity style={styles.likeCommentButton} onPress={() => handleLike(post.id)}>
        
            {/* Like count and buttons */}
    <View style={styles.likeContainer}>
      <TouchableOpacity onPress={() => handleLike(post.id)}>
          <Ionicons name="heart" size={20} color="#FF0000" />
      </TouchableOpacity>
      <Text style={styles.likeCount}>{likes[post.id]} Likes</Text>
    </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.likeCommentButton}>
        <Text style={styles.likeComment}>Repost</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.likeCommentButton}>
        <Text style={styles.likeComment}>Send</Text>
      </TouchableOpacity>
    </View>
          </TouchableOpacity>
        ))}
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff', // Use a color that represents a drug-free theme
    // margin: 10,
    paddingTop:0,
    marginBottom:0,
  },
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 43,
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
  pad:{
    paddingBottom: 35,
  },
  scrollContainer: {
    flex: 1,
  },
  createPostButton: {
    padding: 13, backgroundColor: "#e28743", borderRadius: 90, marginRight: 10, height: 40, 
  },
  createPostButtonText: {
    color: "white", textAlign: "center", fontWeight: "bold", alignSelf: "center", marginTop: 0, fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Adjust the alignment as needed
    alignItems: 'center',
    paddingHorizontal: 0, // Adjust the horizontal padding as needed
    marginVertical: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginHorizontal: 5, // Adjust the horizontal margin as needed
    borderWidth: 1,
    borderColor: '#E16721',
  },
  activeButton: {
    backgroundColor: '#E16721CC', // Dark color for the active button

  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: "auto",
    
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    margin: 10,
    backgroundColor : '#CBC5C8CC',
  },
  postUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  verificationIcon: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
    marginLeft: 5, // Adjust the margin as needed
  },
  postUserPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 15,
    fontSize: 16,
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent : "space-around",
    paddingLeft : 20,
    paddingBottom: 10,
    paddingRight : 20,
  },
  likeComment: {
    paddingTop: 3,
    color: '#1c1c1c',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
  },
  likeIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  likeCount: {
    fontSize: 14,
    color: '#1c1c1c',
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
  postCaption: {
    padding: 15,
    fontSize: 14,
    color: '#555', // Dark Gray
    borderBottomColor : "#B4B4B4",
    borderBottomWidth : 0.3,
    borderBottomRightRadius : 4,
  },
});

HomeScreen.navigationOptions = {
  headerMode:"none",
};


export default HomeScreen;


