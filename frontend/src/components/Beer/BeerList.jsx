import React, { useEffect, useState } from "react";
import SharedTable from "../Shared/SharedTable";
import beerService from "./BeerService";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
      renderField: (isLiked, beerIndex, beerId) => {
        return (
          <IconButton
            onClick={async (event) => {
              event.stopPropagation();

              const response = await beerService.likeBeerById(beerId);

              const updatedBeers = [
                ...beers.slice(0, beerIndex),
                { ...beers[beerIndex], isLiked: response.isLiked },
                ...beers.slice(beerIndex + 1),
              ];
              setBeers(updatedBeers);
            }}
            color="primary"
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        );
      },
    },
    {
      disablePadding: true,
      enableSort: false,
      renderField: (fieldValue, beerIndex, beerId) => {
        return (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleClickDetails(beerId);
            }}
            color="primary"
            variant="contained"
          >
            <OpenInNewIcon />
          </IconButton>
        );
      },
    },
  ];

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

  const handleClickDetails = (beerId) => {
    navigate(`/beers/${beerId}`);
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
    <>
      {userSession.role === "admin" && (
        <Button variant="contained" onClick={handleClickCreate}>
          Dodaj
        </Button>
      )}

      {/* <Button
        variant="contained"
        onClick={handleClickDetails}
        disabled={!selectedItem}
      >
        Detalji
      </Button> */}

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
