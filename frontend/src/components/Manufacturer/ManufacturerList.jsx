import React, { useCallback, useEffect, useRef, useState } from "react";
import SharedTable from "../Shared/SharedTable";
import manufacturerService from "./ManufacturerService";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { debounce } from "lodash";
import { useCart } from "../../hooks/useCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ManufacturerView(manufacturer) {
  this.id = manufacturer._id;
  this.name = manufacturer.name;
  this.location = manufacturer.country + ", " + manufacturer.city;
  this.yearEstablished = manufacturer.yearEstablished;
  this.website = manufacturer.website;
}

export default function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const { userSession } = useAuth();

  const manufacturersTableHeaderCells = [
    {
      id: "name",
      numeric: false,
      label: "Naziv",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "location",
      numeric: false,
      label: "Lokacija",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "yearEstablished",
      numeric: true,
      label: "Godina osnutka",
      disablePadding: false,
      enableSort: true,
    },
    // {
    //   id: "website",
    //   numeric: true,
    //   label: "Web stranica",
    //   disablePadding: false,
    //   enableSort: true,
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await manufacturerService.getAllManufacturers();
        const manufacturers = response.map(
          (item) => new ManufacturerView(item),
        );
        setManufacturers(manufacturers);
      } catch (err) {
        console.log("Error getting manufacturers: ", err);
      }
    };

    fetchData();
  }, []);

  const handleRowSelect = (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  const handleClickCreate = () => {
    navigate("/manufacturers/create");
  };

  const handleClickDetails = () => {
    if (!selectedItem) return;
    navigate(`/manufacturers/${selectedItem.id}`);
  };

  // const handleClickDelete = async () => {
  //   if (!selectedItem) return;

  //   try {
  //     const deleteCount = await beerService.deleteBeerById(selectedItem.id);
  //     if (deleteCount !== 1) return;

  //     const index = beers.findIndex((item) => item.id === selectedItem.id);
  //     if (index !== -1) {
  //       const updatedBeers = [
  //         ...beers.slice(0, index),
  //         ...beers.slice(index + 1),
  //       ];
  //       setBeers(updatedBeers);
  //       setSelectedItem(null);
  //     }
  //   } catch (err) {
  //     console.log("Error deleting beer: ", err);
  //   }
  // };

  return (
    <Box
      sx={{
        marginX: 5,
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        overflow: "hidden",
      }}
    >
      <Typography variant="h5" component="div">
        Proizvođači
      </Typography>

      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {userSession.role === "admin" && (
          <Button
            sx={{ marginLeft: ".25rem" }}
            variant="contained"
            color="primary"
            onClick={handleClickCreate}
          >
            Dodaj
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickDetails}
          disabled={!selectedItem}
          sx={{ marginLeft: ".25rem" }}
        >
          Detalji
        </Button>

        {userSession.role === "admin" && (
          <Button
            variant="contained"
            sx={{ marginLeft: ".25rem" }}
            color="error"
            // onClick={handleClickDelete}
            disabled={userSession.role !== "admin" || !selectedItem}
          >
            Ukloni
          </Button>
        )}
      </Box>

      <SharedTable
        headCells={manufacturersTableHeaderCells}
        rows={manufacturers}
        onRowSelect={handleRowSelect}
        selectedItem={selectedItem}
      />
    </Box>
  );
}
