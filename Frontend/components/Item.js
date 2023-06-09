import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

const Item = ({ name, picture, price, _id, release_date }) => {
  const navigation = useNavigation();

  const ClickImg = () => {
    navigation.navigate("AddItem", { _id, picture, name, price, release_date });
  };
  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={() => ClickImg()}>
        <Image source={{ uri: picture }} style={styles.img} />
      </TouchableOpacity>
      <Text style={styles.nm}>{name.toUpperCase()}</Text>
      <Text style={styles.price}>$ {price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    paddingBottom: 10,
    margin:30,

  },
  img: {
    width: 250,
    height: 250,
    margin: "auto",
    borderRadius: 20,
  },
  nm: {
    fontSize: 22,
    maxWidth: 250,
    textAlign: "center",
    
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    maxWidth: 150,
    textAlign: "center",
    color: "#524b48",
    lineHeight: 50,
  },
});
export default Item;
