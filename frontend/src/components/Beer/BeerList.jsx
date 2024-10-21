import React, { useEffect, useState } from "react";
import SharedTable from "../Shared/SharedTable";
import beerService from "./BeerService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
    { id: "name", numeric: false, label: "Naziv", disablePadding: false },
    {
      id: "alcoholPercentage",
      numeric: true,
      label: "Postotak alkohola",
      disablePadding: false,
    },
    {
      id: "averagePrice",
      numeric: true,
      label: "Prosječna cijena",
      disablePadding: false,
    },
    { id: "rating", numeric: true, label: "Ocjena", disablePadding: false },
    { id: "color", numeric: false, label: "Boja", disablePadding: false },
    {
      id: "manufacturer",
      numeric: false,
      label: "Proizvođač",
      disablePadding: false,
    },
    {
      id: "isLiked",
      numeric: false,
      label: "Sviđa mi se",
      disablePadding: true,
      isToggleButton: true,
      toggleButtonFunction: async (beerIndex, beerId) => {
        if (beerIndex === -1) return;

        // const updatedBeers = [
        //   ...beers.slice(0, beerIndex),
        //   { ...beers[beerIndex], isLiked: !beers[beerIndex].isLiked },
        //   ...beers.slice(beerIndex + 1),
        // ];
        // setBeers(updatedBeers);

        const response = await beerService.likeBeerById(beerId);

        const updatedBeers = [
          ...beers.slice(0, beerIndex),
          { ...beers[beerIndex], isLiked: response.isLiked },
          ...beers.slice(beerIndex + 1),
        ];
        setBeers(updatedBeers);
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

  const handleClickUpdate = () => {
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
    <>
      {userSession.role === "admin" && (
        <Button variant="contained" onClick={handleClickCreate}>
          Dodaj
        </Button>
      )}

      <Button
        variant="contained"
        onClick={handleClickUpdate}
        disabled={!selectedItem}
      >
        Detalji
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
