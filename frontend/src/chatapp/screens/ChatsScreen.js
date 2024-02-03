import { StyleSheet, Text, View ,ScrollView, Pressable, RefreshControl} from "react-native";
import React, { useContext,useEffect,useState } from "react";
// import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {BASEURL} from '@env';
const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  // const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const acceptedFriendsList = async () => {
    try {
      setRefresh(true);
      const user = await JSON.parse(await AsyncStorage.getItem('user'));
    const usertype = await JSON.parse(await AsyncStorage.getItem('userType'));
      console.log(user._id);
      const userId = user._id; 
      const response = await axios.get(
        `${BASEURL}/${usertype}/accepted-friends/${userId}`
      );
      const data = await response.data;
        console.log(response.status,"wtrsd");
      if (response.status===200) {
        const data2 = data.acceptedFriends;
        console.log('qwsdcvvyv',data2);
        setAcceptedFriends(data2);
      }
    } catch (error) {
      console.log("error showing the accepted friends", error);
    } finally{
      setRefresh(false);
    }
  };
  useEffect(() => {

    acceptedFriendsList();
  }, []);
  console.log("friends",acceptedFriends)
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop:30}} 
    refreshControl={<RefreshControl  refreshing={refresh} onRefresh={()=>acceptedFriendsList()} />}>
    
      <View style={styles.topNavbar}>
          <Text style={styles.logo} onPress={()=>navigation.navigate('Home')}>DR Free</Text>
          <View style={styles.userContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
           <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
           <MaterialIcons
             onPress={() => navigation.navigate("Friends")}
             name="people-outline"
             size={24}
             color="black"
           />
         </View>
         </View>
    </View>
      <Pressable>
          {acceptedFriends.map((item,index) => (
              <UserChat key={index} item={item}/>
          ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;

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
    paddingTop: 10,
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
});