import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import genericBeerImage from "../../static/images/generic_beer.jpg";
import ManufacturerForm from "./ManufacturerForm";
import manufacturerService from "./ManufacturerService";
import ManufacturerDetails from "./ManufacturerDetails";

export default function ManufacturerDetailsForm() {
  const { manufacturerId } = useParams();
  const [manufacturerData, setManufacturerData] = useState({});
  const [isViewMode, setViewMode] = useState(!!manufacturerId);
  const { userSession } = useAuth();
  const theme = useTheme();

  const handleSubmit = async function (values) {
    if (manufacturerId) updatManufacturer(values);
    else createManufacturer(values);
    setViewMode(true);
  };

  async function updatManufacturer(values) {
    try {
      const updatedManufacturerData =
        await manufacturerService.updateManufacturerById(
          manufacturerId,
          values,
        );
      setManufacturerData(updatedManufacturerData);
    } catch (err) {
      console.log("Error updating Manufacturer: ", err);
    }
  }

  async function createManufacturer(values) {
    try {
      const createdManufacturerData =
        await manufacturerService.createManufacturer(values);
      setManufacturerData(createdManufacturerData);
    } catch (err) {
      console.log("Error creating Manufacturer: ", err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (manufacturerId) {
          const manufacturerData =
            await manufacturerService.getManufacturerById(manufacturerId);
          console.log(manufacturerData);
          setManufacturerData(manufacturerData);
        }
      } catch (err) {
        console.log("Error getting manufacturer data: ", err);
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
            <Typography variant="h4">
              Detalji - {manufacturerData.name}
            </Typography>
          ) : (
            <Typography variant="h4">Uređivanje</Typography>
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
              maxWidth: "70%",
              maxHeight: "70%",
              width: "auto",
              height: "auto",
            }}
            alt=""
            src={genericBeerImage}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          {isViewMode ? (
            <ManufacturerDetails manufacturerData={manufacturerData} />
          ) : (
            <ManufacturerForm
              manufacturerData={manufacturerData}
              handleSubmit={handleSubmit}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
