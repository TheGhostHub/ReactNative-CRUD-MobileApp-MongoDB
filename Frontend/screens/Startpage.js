import React from "react";
import { ImageBackground, TouchableOpacity,View } from "react-native";


export default function StartScreen({navigation}){

    
    const gologin = () => {
        navigation.navigate("Login");
      };

    return (
        <View style={{height:'100%',width:'100%'}}>
            <TouchableOpacity onPress={gologin}>
                <ImageBackground style={{height:'100%',width:'100%'}} source={require('../assets/startimage.jpeg')} >

                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}