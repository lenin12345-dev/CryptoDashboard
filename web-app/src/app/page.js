"use client";
import { useCrypto } from "./context/CryptoContext";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Skeleton,
  Box,
} from "@mui/material";

export default function Home() {
  const { cryptos, loading, updateCryptoPrices } = useCrypto();
  const [search, setSearch] = useState("");

  let cryptoListData = Object.entries(cryptos).filter(([key]) => {
    return key.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container
      maxWidth="lg"
      sx={{
        m: 2,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Crypto Prices Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Search Cryptocurrency"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            width: "60%",
            borderRadius: "8px",
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          variant="outlined"
        />

        <Button
          variant="contained"
          onClick={updateCryptoPrices}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Refresh Prices
        </Button>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              sx={{
                m: 2,
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                height: "150px",
              }}
            >
              <CardContent>
                <Skeleton variant="text" width="80%" sx={{ marginBottom: 1 }} />
                <Skeleton variant="text" width="60%" />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : cryptoListData.length === 0 ? (
       
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="150px"
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: 1,
            marginTop: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary" fontWeight="bold">
            No results found. Try searching for another cryptocurrency.
          </Typography>
        </Box>
      ) : (
     
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {cryptoListData.map(([key, value]) => (
            <Card
              key={key}
              sx={{
                m: 2,
                backgroundColor: "#1e3a8a",
                color: "white",
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  {key ? key[0].toUpperCase() + key.slice(1) : ""}
                </Typography>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  ${value?.usd}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
