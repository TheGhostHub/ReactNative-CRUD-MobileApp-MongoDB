import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { StoreContext } from "../Context/StoreContext";
export default function Register({ navigation }) {
  const { ipAddress } = useContext(StoreContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const onPressFunction = () => {
    if (password !== confirmPass) {
      alert("Passwords do not match");
    } else if (!validateEmail(email)) {
      alert("Warning", "Invalid email address");
    } else if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPass !== ""
    ) {
      addUser();
      navigation.navigate("Login");
    } else {
      alert("Empty field");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const addUser = async () => {
    try {
      const newUser = {
        username,
        email,
        password,
      };

      const response = await axios.post(
        `http://${ipAddress}:8050/user/add`,
        newUser
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 100, width: 100 }}
        source={require("../assets/membership.png")}
      />
      <Text style={styles.regtxt}>Sign up</Text>
      <Text style={{ fontSize: 15, color: "#656d94" }}>
        Create a new account
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPass(text)}
          secureTextEntry
        />

        <Pressable onPress={onPressFunction} style={styles.button}>
          <Text style={styles.regbtntext}>Register</Text>
        </Pressable>
        <View style={styles.signupContainer}>
          <Text style={{ fontSize: 15 }}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signupButton}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

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
