import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { StoreContext } from "../Context/StoreContext";

const Login = ({ navigation }) => {
  const { setUserEmail, ipAddress, setPurchaseHistory } =
    useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressFunction = () => {
    navigation.navigate("Register");
  };

  async function login(e) {
    e.preventDefault();
    //const ipAddress = "192.168.135.218";
    await axios
      .post(`http://${ipAddress}:8050/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.status);
        alert("Login success");
        setUserEmail(email);
        navigation.navigate("ClientInterface");
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed");
      });
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 100, width: 100 }}
        source={require("../assets/permission.png")}
      />
      <Text style={styles.regtxt}>Sign in</Text>
      <Text style={{ fontSize: 15, color: "#656d94" }}>
        Login to your account
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <Pressable onPress={login} style={styles.button}>
          <Text style={styles.regbtntext}>Login</Text>
        </Pressable>

        <View style={styles.signupContainer}>
          <Text style={{ fontSize: 15 }}>Don't have an account? </Text>
          <Pressable onPress={onPressFunction}>
            <Text style={styles.signupButton}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    padding: 8,
  },
  regtxt: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3455eb",
  },
  form: {
    width: "90%",
    marginTop: 50,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    paddingLeft: 5,
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
  regbtntext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#3455eb",
    textDecorationLine: "underline",
  },
});
export default Login;
