import { View, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Text } from "@react-native-material/core";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";

const PurchaseHistoryDetails = () => {
  const { PurchaseHistory, userEmail, setPurchaseHistory, ipAddress } =
    useContext(StoreContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8050/order/orders/${userEmail}`
      );
      setPurchaseHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={PurchaseHistory}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.ordernumber}</Text>
            <Text>{item.total}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  list: {
    paddingHorizontal: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default PurchaseHistoryDetails;
