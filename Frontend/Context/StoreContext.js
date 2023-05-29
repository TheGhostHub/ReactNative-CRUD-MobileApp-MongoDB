import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
 
  const [ipAddress, setIpAddress] = useState("192.168.8.100");
  const [userEmail, setUserEmail] = useState("");
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  const [nbrsProductsBag, setNbrsProductbag] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [PurchaseHistory, setPurchaseHistory] = useState([]);
  const [nbrsPurchaseHistory, setNbrsPurchaseHistory] = useState(0);


  const RandomOrderNumber = (max) => {
    return Math.floor(Math.random() * max);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://${ipAddress}:8050/product/`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dateTime = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    return day + "/" + month + "/" + year;
  };

  return (
    <StoreContext.Provider
      value={{
        setData,
        data,
        setBasket,
        basket,
        nbrsProductsBag,
        setNbrsProductbag,
        setTotalPrice,
        totalPrice,
        setPurchaseHistory,
        PurchaseHistory,
        setNbrsPurchaseHistory,
        nbrsPurchaseHistory,
        dateTime,
        RandomOrderNumber,
        userEmail,
        setUserEmail,
        ipAddress,
        setIpAddress,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
