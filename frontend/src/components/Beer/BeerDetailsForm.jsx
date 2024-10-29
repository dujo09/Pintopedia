import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import yellowImage from "../../static/images/Solid_yellow.jpg";
import BeerDetails from "./BeerDetails";
import BeerForm from "./BeerForm";
import beerService from "./BeerService";

export default function BeerDetailsForm() {
  const { beerId } = useParams();
  const [beerData, setBeerData] = useState({});
  const [manufacturers, setManufacturers] = useState([]);
  const [isViewMode, setViewMode] = useState(!!beerId);
  const { userSession } = useAuth();
  const theme = useTheme();

  const handleSubmit = async function (values) {
    if (beerId) updateBeer(values);
    else createBeer(values);
    setViewMode(true);
  };

  async function updateBeer(values) {
    try {
      const updatedBeerData = await beerService.updateBeerById(beerId, values);
      setBeerData(updatedBeerData);
    } catch (err) {
      console.log("Error updating Beer: ", err);
    }
  }

  async function createBeer(values) {
    try {
      const createdBeerData = await beerService.createBeer(values);
      setBeerData(createdBeerData);
    } catch (err) {
      console.log("Error creating Beer: ", err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (beerId) {
          const beerData = await beerService.getBeerById(beerId);
          setBeerData(beerData);
        }

        const manufacturers =
          await beerService.getAllManufacturersForDropdown();
        const manufacturersData = manufacturers.map((manufacturer) => {
          return {
            id: manufacturer._id,
            name: manufacturer.name,
          };
        });
        setManufacturers(manufacturersData);
      } catch (err) {
        console.log("Error getting beer data: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "0.4em",
          height: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: theme.palette.background.lighter,
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.main,
          borderRadius: "2px",
        },
      }}
    >
      <Grid2
        sx={{
          marginY: 3,
          marginX: 2,
        }}
        container
        spacing={3}
      >
        <Grid2 size={{ xs: 12, md: 11 }}>
          {isViewMode ? (
            <Typography variant="h4">Detalji - {beerData.name}</Typography>
          ) : (
            <Typography variant="h4">Uređivanje - {beerData.name}</Typography>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12, md: 1 }}>
          {userSession.role === "admin" && isViewMode && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setViewMode(false)}
            >
              Uredi
            </Button>
          )}
          {userSession.role === "admin" && !isViewMode && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setViewMode(true);
              }}
            >
              Odustani
            </Button>
          )}
        </Grid2>

        <Grid2 size={12}>
          <Divider />
        </Grid2>

        <Grid2
          sx={{
            marginX: "auto",
            marginY: 0,
            [theme.breakpoints.only("xs")]: {
              width: "95%",
              height: "95%",
            },
            [theme.breakpoints.up("md")]: {
              width: "40%",
              height: "40%",
            },
          }}
          size={{ xs: 12, md: 6 }}
        >
          <img
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
            }}
            alt=""
            src={yellowImage}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          {isViewMode ? (
            <BeerDetails
              beerData={beerData}
              manufacturerData={manufacturers.find(
                (item) => item.id === beerData.manufacturer,
              )}
            />
          ) : (
            <BeerForm
              beerData={beerData}
              manufacturers={manufacturers}
              handleSubmit={handleSubmit}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
