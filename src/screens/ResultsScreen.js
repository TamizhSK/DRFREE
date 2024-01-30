import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    Pressable,
    FlatList,
  } from "react-native";
  import React from "react";
  import { useRoute } from "@react-navigation/native";
  import { AntDesign } from "@expo/vector-icons";
  const ResultsScreen = ({navigation}) => {
    const route = useRoute();
    return (
      <SafeAreaView style={{ margin: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Your Results</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 14,
              marginVertical: "10%",
            }}
          >
            <Text>Share</Text>
            <AntDesign
              style={{ marginLeft: 4 }}
              name="sharealt"
              size={18}
              color="black"
            />
          </View>
        </View>
  
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <Text style={{fontSize:15}}>Questions Answered</Text>
          <Text>(10/10)</Text>
        </View>
  
        <Pressable
          style={{
            backgroundColor: "white",
            height: 350,
            borderRadius: 7,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 30,
              fontWeight: "500",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            SCORE CARD
          </Text>
          <FlatList
            numColumns={2}
            data={route.params.answers}
            renderItem={({ item, i }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft:"auto",
                  marginRight:"auto"
                }}
              >
                <Text>{item.question}</Text>
                {item.answer === true ? (
                  <AntDesign style={{marginLeft:5}} name="checkcircle" size={20} color="green" />
                ) : (
                  <AntDesign style={{marginLeft:5}} name="closecircle" size={20} color="red" />
                )}
              </View>
            )}
          />
  
          <Pressable onPress={() =>
              navigation.navigate("Activate")
            }style={{backgroundColor:"#e28743",padding:8,marginLeft:"auto",marginRight:"auto",marginBottom:20,borderRadius:12}}>
            <Text style={{color:"black",textAlign:"center", fontSize:25}}>Continue</Text>
          </Pressable>
        </Pressable>
      </SafeAreaView>
    );
  };
  
  export default ResultsScreen;
  
  const styles = StyleSheet.create({});