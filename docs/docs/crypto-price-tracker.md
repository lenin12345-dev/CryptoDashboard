# Crypto Price Tracker Documentation

## **1. Project Setup**
### **Install Dependencies**
```sh
git clone <repository-url>
cd crypto-price-tracker/web-app
npm install
```

### **Run the Web Application**
```sh
npm run dev
```
The application will be available at `http://localhost:3000/`.

## **2. API Integration**
The app fetches cryptocurrency prices from the CoinGecko API using Axios.

### **Fetching Data**
The API request is made using the following function:
```js
import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/simple/price";

export const fetchCryptoData = async (currencies = ["bitcoin", "ethereum", "dogecoin", "ripple", "litecoin"]) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: currencies.join(","),
        vs_currencies: "usd",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return null;
  }
};
```
The API is called in the `CryptoProvider` context to update the state of the application.

## **3. State Management**
The project uses the **Context API** to manage global state and store cryptocurrency price data.

### **Why Context API?**
- It simplifies state management without needing external libraries like Redux or Zustand as external libraraies increases the memory usage.
- It ensures that data is available globally without prop drilling.
- The `CryptoProvider` fetches data and provides it across the app.

### **Crypto Context Implementation**
```js
import { useState, useContext, createContext, useEffect } from "react";
import { fetchCryptoData } from "../api/cryptodata";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState({});
  const [loading, setLoading] = useState(false);

  const updateCryptoPrices = async () => {
    try {
      setLoading(true);
      const response = await fetchCryptoData();
      if (response) setCryptos(response);
    } catch (error) {
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
```

## **4. Challenges & Solutions**
There weren’t many challenges due to the simplicity of the application.

### **Error Handling**
- When API requests failed, the app showed an empty state without error messages.
- **Solution:** Added error handling to display a message when data cannot be fetched.

This documentation provides a comprehensive guide to setting up, running, and understanding the Crypto Price Tracker project.