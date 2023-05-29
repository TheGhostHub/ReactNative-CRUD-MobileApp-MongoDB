import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Item from "../components/Item";
import { StoreContext } from "../Context/StoreContext";

export default function HomeScreen() {
  const { data } = useContext(StoreContext);

  const renderItem = ({ item }) => (
    <View style={styles.studentContainer}>
      {/* <Text style={styles.studentName}>{item.firstname}</Text>
      <Text style={styles.studentEmail}>{item.email}</Text> */}
      <Item {...item} />
    </View>
  );

  const keyExtractor = (item) => {
    if (item._id) {
      return item._id.toString();
    } else {
      return Math.random().toString();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  studentContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  studentEmail: {
    fontSize: 14,
    color: "gray",
  },
});
