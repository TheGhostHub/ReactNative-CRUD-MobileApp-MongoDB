import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Item from "../components/Item";
import { StoreContext } from "../Context/StoreContext";

export default function HomeScreen() {
  const { data } = useContext(StoreContext);

  const renderItem = ({ item }) => (
    <View style={styles.homebody}>
      <Item {...item} /> 
    </View>
  );// It's a convenient way to pass multiple props without explicitly specifying each one {...item}

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
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    justifyContent: "center",
    
  },
  homebody: {
    margin:10,
    padding: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});
