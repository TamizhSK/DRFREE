import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import pnimg from "../../assets/banner1.jpg";
import gg from "../../assets/banner2.jpg";
import fb from "../../assets/banner3.jpg";
import gh from "../../assets/banner11.jpg";
// import Colors from '../Utils/Colors';
import { useWarmUpBrowser } from '../hooks/warmUpBrowser';
WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image
        source={pnimg}
        style={{
          width: 500,
          height: 500,
          resizeMode: "center",  // Corrected property name
        }}
      />
      <View style={{
        height: 500,
        width: 400,
        marginTop: -30,
        padding: 20,
        backgroundColor: Colors.BLACK
      }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 30,
          marginTop: 20,
          color: Colors.WHITE,
          fontFamily: 'Outfit-bold'
        }}>ACLMS</Text>
        <Text style={{
          textAlign: 'center',
          fontSize: 20,
          marginTop: 10,
          color: Colors.WHITE,
          opacity: 1,
          fontFamily: 'Outfit-mid'
        }}>Your Onestop Teacher</Text>
        <TouchableOpacity
        onPress={onPress}
          style={{
            backgroundColor: Colors.WHITE,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
            padding: 10,
            borderRadius: 99,
            marginTop: 20,
          }}>
          <Image source={gg}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{
            textAlign: 'center',
            fontSize: 20,
            color: Colors.BLACK,
            fontFamily: 'Outfit-mid',
            marginLeft: 20,
          }}
          >Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={onPress}
          style={{
            backgroundColor: Colors.WHITE,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
            padding: 10,
            borderRadius: 99,
            marginTop: 20,
          }}>
          <Image source={fb}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{
            textAlign: 'center',
            fontSize: 20,
            color: Colors.BLACK,
            fontFamily: 'Outfit-mid',
            marginLeft: 10,
          }}
          >Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={onPress}
          style={{
            backgroundColor: Colors.WHITE,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
            padding: 10,
            borderRadius: 99,
            marginTop: 20,
          }}>
          <Image source={gh}
            style={{ width: 35, height: 35 }}
          />
          <Text style={{
            textAlign: 'center',
            fontSize: 20,
            color: Colors.BLACK,
            fontFamily: 'Outfit-mid',
            marginLeft: 10,
          }}
          >Login with Github</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}