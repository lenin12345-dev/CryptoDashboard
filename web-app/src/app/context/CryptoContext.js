"use client";
import {
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import { fetchCryptoData } from "../api/cryptodata";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState({});
  const [loading, setLoading] = useState(false);

  const updateCryptoPrices = async () => {
    try {
      setLoading(true);
      const response = await fetchCryptoData();

      if (response) {
        setCryptos(response);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateCryptoPrices();
  }, []);

  return (
    <CryptoContext.Provider value={{ loading, cryptos, updateCryptoPrices }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
