import { View, FlatList, StyleSheet, Image,Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import { Text } from "@react-native-material/core";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";

const PurchaseHistoryDetails = ({navigation}) => {
  const { PurchaseHistory, userEmail, setPurchaseHistory, ipAddress } =
    useContext(StoreContext);

    const goToLogin = () => {
      navigation.navigate("Login");
    };

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
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={require("../assets/man.png")}
        />
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <FlatList
        style={styles.history}
        data={PurchaseHistory}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>OrderID: {item.ordernumber}</Text>
            <Text>Total: ${item.total}</Text>
            <Text>Purchase Date: {item.date}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      <Pressable onPress={goToLogin} style={styles.button}>
        <Text style={styles.regbtntext}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: "cover",
  },
  userEmail: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#08c22a",
  },
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
  list: {
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24a0ed",
    borderColor: "#24a0ed",
  },
});

export default PurchaseHistoryDetails;
