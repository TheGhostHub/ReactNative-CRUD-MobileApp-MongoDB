import { View, StyleSheet, Image } from "react-native";
import { Button, Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";

const AddItem = () => {
  const {
    setBasket,
    setNbrsProductbag,
    nbrsProductsBag,
    setTotalPrice,
    totalPrice,
    userEmail,
    ipAddress,
  } = useContext(StoreContext);
  const route = useRoute();
  const { price, picture, name, release_date } = route.params;
  const addItem = async () => {
    await axios
      .post(`http://${ipAddress}:8050/cart/add/`, {
        picture: picture,
        name: name,
        price: price,
        userEmail: userEmail,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const addToCart = () => {
    addItem();
    setNbrsProductbag(nbrsProductsBag + 1);
    setTotalPrice(totalPrice + price);

    setBasket((prevBasket) => [...prevBasket, { picture, name, price }]);
  };

  return (
    <ScrollView>
      <View style={styles.box}>
        <Image source={{ uri: picture }} style={styles.img} />
        <Text style={styles.date}> {release_date}</Text>
        <Text color="gold">New</Text>
        <Text style={styles.nm}>{name}</Text>
        <Text style={styles.price}>$ {price}</Text>
        <Button
          onPress={() => addToCart()}
          variant="contained"
          title="add"
          trailing={(props) => <Icon name="basket" {...props} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    paddingBottom: 40,
  },
  img: {
    width: 450,
    height: 500,
    margin: "auto",
  },
  date: {
    fontSize: 10,
  },
  nm: {
    fontSize: 22,
    maxWidth: 150,
    textAlign: "center",
    marginTop: 30,
  },
  price: {
    fontSize: 20,
    maxWidth: 150,
    textAlign: "center",
    color: "#524b48",
    lineHeight: 50,
  },
});

export default AddItem;
