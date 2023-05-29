import { View, FlatList, StyleSheet, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import { Text, Button } from "@react-native-material/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StoreContext } from "../Context/StoreContext";
import ItemCard from "../components/ItemCard";
import axios from "axios";

const Card = () => {
  const {
    basket,
    totalPrice,
    setPurchaseHistory,
    setBasket,
    setNbrsProductbag,
    setTotalPrice,
    setNbrsPurchaseHistory,
    nbrsProductsBag,
    dateTime,
    RandomOrderNumber,
    userEmail,
    ipAddress,
  } = useContext(StoreContext);
  //const ipAddress = "192.168.135.218";
  function addOrder() {
    axios
      .post(`http://${ipAddress}:8050/order/add`, {
        ordernumber: RandomOrderNumber(100000),
        total: totalPrice,
        date: dateTime(),
        userEmail: userEmail,
      })
      .then(() => {
        alert("Order Added");
        fetchPurchaseHistory();
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  const fetchPurchaseHistory = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8050/order/orders/${userEmail}`
      );
      setPurchaseHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItems = (_id) => {
    axios
      .delete(`http://${ipAddress}:8050/cart/delete-all/${userEmail}`)
      .then((res) => {
        console.log(res.data); // Optional: Log the deleted student data
        //getStudents(); // Refresh the student list after deletion
        fetchCartItems();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const payment = () => {
    addOrder();
    deleteItems();
    setBasket([]);
    setNbrsProductbag(0); // tab icon = 0
    setTotalPrice(0); // total price text into Card components = 0

    alert("Payment successful");
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

      // Update nbrsProductsBag
      const numberOfItems = response.data.length;
      setNbrsProductbag(numberOfItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {totalPrice !== 0 && (
        <Text style={styles.center}>Total: ${totalPrice.toFixed(2)}</Text>
      )}

      {basket.length != 0 ? (
        <View style={styles.pd}>
          <FlatList
            data={basket}
            renderItem={({ item }) => <ItemCard {...item} />}
            keyExtractor={(item, index) =>
              item.itemId ? item.itemId.toString() : index.toString()
            }
          />
          <Pressable style={styles.button} onPress={payment}>
            <Text style={styles.text}>PAYMENT</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.msgEmpty}>Empty Bag</Text>
          <Ionicons name="cart" size={30} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F6F9",
  },
  center: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "black",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  pd: {
    backgroundColor: "#C4DFDF",
    width: "90%",
    height: "90%",
    alignSelf: "center",
    borderRadius: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  msgEmpty: {
    fontSize: 28,
    paddingBottom: 10,
  },
});

export default Card;
