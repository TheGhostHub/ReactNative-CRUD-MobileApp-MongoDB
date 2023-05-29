import { useContext, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Card from "./screens/Card";
import AddItem from "./components/AddItem";
import StoreContextProvider, { StoreContext } from "./Context/StoreContext";
import PurchaseHistoryDetails from "./screens/PurchaseHistory";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreContextProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#212A3E" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ClientInterface" component={ClientInterface} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreContextProvider>
  );
}

export const ClientInterface = () => {
  const { nbrsProductsBag } = useContext(StoreContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Store") {
            iconName = focused ? "ios-cart" : "ios-cart-outline";
          } else if (route.name === "Card") {
            iconName = focused ? "ios-card" : "ios-card-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "ios-person-circle"
              : "ios-person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "yellow",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#212A3E",
        },
      })}
    >
      <Tab.Screen
        name="Store"
        component={ClientBye}
        options={{
          headerStyle: {
            height: 50, // Set custom header height
            backgroundColor: "#212A3E", // Set custom background color for the header
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitle: "Store",
        }}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            height: 50, // Set custom header height
            backgroundColor: "#212A3E", // Set custom background color for the header
          },
          tabBarBadge: nbrsProductsBag,
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitle: "Card",
        }}
        name="Card"
        component={Card}
      />
      <Tab.Screen
        name="Profile"
        component={PurchaseHistoryDetails}
        options={{
          headerStyle: {
            height: 50, // Set custom header height
            backgroundColor: "#212A3E", // Set custom background color for the header
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitle: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};
export const ClientBye = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoreStack"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="purchaseHistoryDetails"
        component={PurchaseHistoryDetails}
      />
    </Stack.Navigator>
  );
};
