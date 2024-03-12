import React, {createContext, useEffect, useState, useNavigate} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();
import { useNavigation } from "@react-navigation/native";
// import imgname from "../assets/adaptive-icon.png"


export const AuthProvider = ({children}) => {
    // const navigation = useNavigation() ;

    const [test, setTest] = useState("");

    // const [token, SetToken] = useState(null);
    const [user, SetUser] = useState(null);
    const [usertype, setUserType] =useState(null);
    const login = async(data) => {
        try{
            setTest("login");
            await AsyncStorage.setItem('userToken', JSON.stringify(data.token));
            await AsyncStorage.setItem('user', JSON.stringify(data.result));
            await AsyncStorage.setItem('userType', JSON.stringify(data.usertype));
            SetUser(data.result);
        }catch(error){
            console.error(error);
        }
    };

    const logout = async() => {
        try {
            setTest('logout');
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('userType');
            console.log('logout-ended');
            SetUser(null);
            // navigation.navigate('Welcome');
        } catch (error) {
            console.log(error);
        }
    }

    const isLogged = async() => {
        try {
            let userToken = JSON.parse(await AsyncStorage.getItem('userToken'));
            let userData = JSON.parse(await AsyncStorage.getItem('user'));
            let userType = JSON.parse(await  AsyncStorage.getItem('userType')); 
            // console.log("userData: ", userData);
            SetUser(userData);
            setUserType(userType);
        } catch (error) {
            console.log('isLoggedIn', error);
        }
    }

    useEffect(() => {
        const isLoggedIn = async() => {
            try {
                let userToken = JSON.parse(await AsyncStorage.getItem('userToken'));
                let userData = JSON.parse(await AsyncStorage.getItem('user'));
            let userType = JSON.parse(await  AsyncStorage.getItem('userType')); 
            setUserType(userType);

                // console.log("userData: ", userData);
                SetUser(userData);
                // SetToken(userToken);
            } catch (error) {
                console.log('isLoggedIn', error);
            }
        }
        isLoggedIn();
    }, []);
    return(
        <AuthContext.Provider value={{test, login, logout, user, isLogged, usertype}}>
            {children}
            {/* <img src={imgname} alt="" /> */}
        </AuthContext.Provider>
    );
}