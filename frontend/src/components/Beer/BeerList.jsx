import React, { useCallback, useEffect, useRef, useState } from "react";
import SharedTable from "../Shared/SharedTable";
import beerService from "./BeerService";
import { Button, Drawer, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { debounce } from "lodash";
import { useCart } from "../../hooks/useCart";
import ShoppingCartItem from "../ShoppingCart/ShoppingCartItem";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

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

  const handleClickAddToCart = () => {
    if (!selectedItem) return;
    addItemQuantity(selectedItem);
  };

  const handleClickRemoveFromCart = () => {
    if (!selectedItem) return;
    removeItemQuantity(selectedItem.id);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {userSession.role === "admin" && (
        <Button variant="contained" onClick={handleClickCreate}>
          Dodaj
        </Button>
      )}

      <Button
        variant="contained"
        onClick={handleClickDetails}
        disabled={!selectedItem}
      >
        Detalji
      </Button>

      <Button
        variant="contained"
        onClick={handleClickAddToCart}
        disabled={!selectedItem}
      >
        Dodaj u košaricu
      </Button>

      <Button
        variant="contained"
        onClick={handleClickRemoveFromCart}
        disabled={!selectedItem}
      >
        Izbaci iz košarice
      </Button>

      {userSession.role === "admin" && (
        <Button
          variant="contained"
          onClick={handleClickDelete}
          disabled={userSession.role !== "admin" || !selectedItem}
        >
          Ukloni
        </Button>
      )}

      <SharedTable
        headCells={courseTableHeaderCells}
        rows={beers}
        onRowSelect={handleRowSelect}
        selectedItem={selectedItem}
      />
    </>
  );
}
