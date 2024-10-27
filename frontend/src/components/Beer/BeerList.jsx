import React, { useCallback, useEffect, useRef, useState } from "react";
import SharedTable from "../Shared/SharedTable";
import beerService from "./BeerService";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { debounce } from "lodash";
import { useCart } from "../../hooks/useCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function BeerView(beer) {
  this.id = beer._id;
  this.name = beer.name;
  this.alcoholPercentage = beer.alcoholPercentage;
  this.averagePrice = beer.averagePrice;
  this.color = beer.color;
  this.rating = beer.rating;
  this.manufacturer = beer.manufacturer.name;
  this.isLiked = beer.isLiked;
}

export default function BeerList() {
  const [beers, setBeers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const { userSession } = useAuth();
  const { cartItems, addItemQuantity, removeItemQuantity } = useCart();
  const [open, setOpen] = useState(false);

  const debounceLikeMap = useRef(new Map());
  const courseTableHeaderCells = [
    {
      id: "name",
      numeric: false,
      label: "Naziv",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "alcoholPercentage",
      numeric: true,
      label: "Postotak alkohola",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "averagePrice",
      numeric: true,
      label: "Prosječna cijena",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "rating",
      numeric: true,
      label: "Ocjena",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "color",
      numeric: false,
      label: "Boja",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "manufacturer",
      numeric: false,
      label: "Proizvođač",
      disablePadding: false,
      enableSort: true,
    },
    {
      id: "isLiked",
      label: "Sviđa mi se",
      numeric: false,
      disablePadding: true,
      enableSort: true,
      renderField: (isLiked, beerId) => {
        return (
          <IconButton
            onClick={async (event) => {
              event.stopPropagation();

              const beerIndex = beers.findIndex((item) => item.id === beerId);

              setBeers((prevBeers) => {
                const updatedBeers = [
                  ...prevBeers.slice(0, beerIndex),
                  { ...prevBeers[beerIndex], isLiked: !isLiked },
                  ...prevBeers.slice(beerIndex + 1),
                ];
                return updatedBeers;
              });

              handleLikeClick(beerId, !isLiked);
            }}
            color="primary"
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        );
      },
    },
    {
      id: "addToCart",
      label: "U košaricu",
      numeric: false,
      disablePadding: true,
      enableSort: false,
      renderField: (value, beerId) => {
        return (
          <IconButton
            onClick={async (event) => {
              event.stopPropagation();

              const beer = beers.find((item) => item.id === beerId);
              if (!beer) return;

              addItemQuantity(beer);
            }}
            color="primary"
          >
            <AddShoppingCartIcon />
          </IconButton>
        );
      },
    },
  ];

  const likeBeer = async (beerId, isLiked) => {
    try {
      const response = await beerService.likeBeerById(beerId, isLiked);
      const beerIndex = beers.findIndex((item) => item.id === beerId);

      setBeers((prevBeers) => {
        const updatedBeers = [
          ...prevBeers.slice(0, beerIndex),
          { ...prevBeers[beerIndex], isLiked: response.isLikedDb },
          ...prevBeers.slice(beerIndex + 1),
        ];
        return updatedBeers;
      });
    } catch (err) {
      console.error("Error liking beer: ", err);
    }
  };

  const handleLikeClick = (beerId, isLiked) => {
    if (!debounceLikeMap.current.has(beerId)) {
      const debouncedFunction = debounce(
        (isLiked) => likeBeer(beerId, isLiked),
        500,
      );
      debounceLikeMap.current.set(beerId, debouncedFunction);
    }

    debounceLikeMap.current.get(beerId)(isLiked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await beerService.getAllBeers();
        const beers = response.map((item) => new BeerView(item));
        setBeers(beers);
      } catch (err) {
        console.log("Error getting beers: ", err);
      }
    };

    fetchData();
  }, []);

  const handleRowSelect = (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  const handleClickCreate = () => {
    navigate("/beers/create");
  };

  const handleClickDetails = () => {
    if (!selectedItem) return;
    navigate(`/beers/${selectedItem.id}`);
  };

  const handleClickDelete = async () => {
    if (!selectedItem) return;

    try {
      const deleteCount = await beerService.deleteBeerById(selectedItem.id);
      if (deleteCount !== 1) return;

      const index = beers.findIndex((item) => item.id === selectedItem.id);
      if (index !== -1) {
        const updatedBeers = [
          ...beers.slice(0, index),
          ...beers.slice(index + 1),
        ];
        setBeers(updatedBeers);
        setSelectedItem(null);
      }
    } catch (err) {
      console.log("Error deleting beer: ", err);
    }
  };

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
        Pive
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
            onClick={handleClickDelete}
            disabled={userSession.role !== "admin" || !selectedItem}
          >
            Ukloni
          </Button>
        )}
      </Box>

      <SharedTable
        headCells={courseTableHeaderCells}
        rows={beers}
        onRowSelect={handleRowSelect}
        selectedItem={selectedItem}
      />
    </Box>
  );
}
