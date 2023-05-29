import React, { useEffect } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";

export default function StartScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <View style={{ height: '100%', width: '100%' }}>
      <TouchableOpacity >
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../assets/startimage.jpeg')} >
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}