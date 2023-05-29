import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Text } from "@react-native-material/core";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";

const ItemCard = ({ name, picture, price, _id, release_date }) => {
  const {
    setBasket,
    setNbrsProductbag,
    setTotalPrice,
    userEmail,
    ipAddress,
  } = useContext(StoreContext);

  const deleteItem = (_id) => {
    axios
      .delete(`http://${ipAddress}:8050/cart/delete/${_id}`)
      .then((res) => {
        console.log(res.data); // Optional: Log the deleted student data
        fetchCartItems();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8050/cart/cartitems/${userEmail}`
      );
      setBasket(response.data);
      console.log(response.data);

      // Calculate total price
      const total = response.data.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(total);

      const numberOfItems = response.data.length;
      setNbrsProductbag(numberOfItems);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={{ uri: picture }} style={styles.img} />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>$ {price}</Text>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => deleteItem(_id)}
        >
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5, // set to 0.5 to show 2 items in the same line
    padding: 10,
    margin: 10,
    alignItems: "center",
    flexDirection: "column", // added to show 2 items in the same line
  },
  img: {
    width: 250,
    height: 150,
    resizeMode: "center",
    margin: "auto",
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    maxWidth: 250,
    textAlign: "center",
    marginTop: 10,
  },
  price: {
    fontSize: 12,
    maxWidth: 150,
    textAlign: "center",
    color: "#524b48",
    fontWeight: "bold",
  },
  removeBtn: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
});

export default ItemCard;
