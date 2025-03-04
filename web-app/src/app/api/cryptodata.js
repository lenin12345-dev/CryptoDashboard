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
