import React, { useEffect, useState } from "react";
import SharedTable from "../Shared/SharedTable";
import beerService from "./BeerService";

const courseTableHeaderCells = [
  { id: "name", numeric: false, label: "Naziv", disablePadding: false },
  { id: "alcoholPercentage", numeric: true, label: "Postotak alkohola", disablePadding: false },
  { id: "averagePrice", numeric: true, label: "Prosječna cijena", disablePadding: false },
  { id: "rating", numeric: true, label: "Ocjena", disablePadding: false },
  { id: "color", numeric: false, label: "Boja", disablePadding: false },
];

function BeerView(beer) {
  this.id = beer._id;
  this.name = beer.name;
  this.alcoholPercentage = beer.alcoholPercentage;
  this.averagePrice = beer.averagePrice;
  this.color = beer.color;
  this.rating = beer.rating;
}

export default function BeerList() {
  const [beers, setBeers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  return (
    <>
        <SharedTable
          headCells={courseTableHeaderCells}
          rows={beers}
          onRowSelect={handleRowSelect}
          selectedItem={selectedItem}
        />
    </>
  );
}
