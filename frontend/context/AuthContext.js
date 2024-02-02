import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [test, setTest] = useState("");
    const [token, SetToken] = useState(null);
    const [user, SetUser] = useState(null);
    const login = async(data) => {
        try{
            setTest("login");
            await AsyncStorage.setItem('userToken', JSON.stringify(data.token));
            await AsyncStorage.setItem('user', JSON.stringify(data.result));

        }catch(error){
            console.error(error);
        }
    };

    const logout = async() => {
        try {
            setTest('logout');
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('user');
            console.log('logout-ended');
            isLoggedIn();
        } catch (error) {
            console.log(error);
        }
    }

    const isLoggedIn = async() => {
        try {
            let userToken = JSON.parse(await AsyncStorage.getItem('userToken'));
            let userData = JSON.parse(await AsyncStorage.getItem('user'));
            SetUser(userData);
            // SetToken(userToken);
        } catch (error) {
            console.log('isLoggedIn', error);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);
    return(
        <AuthContext.Provider value={{test, login, logout, user, token, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}