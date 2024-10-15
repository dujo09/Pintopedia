import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import beerService from './BeerService';
import{useParams} from "react-router-dom";

const validationSchema = yup.object({
    name: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    alcoholPercentage: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    color: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    averagePrice: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    rating: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
    flavorDescription: yup
        .string("Unesi polje")
        .required("Polje je obavezno"),
});

export default function BeerDetailsForm() {
  const {beerId} = useParams();
  const [beerData, setBeerData] = useState({});   
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: beerData.name || "", 
      alcoholPercentage: beerData.alcoholPercentage || "", 
      color: beerData.color || "", 
      averagePrice: beerData.averagePrice || "", 
      rating: beerData.rating || "", 
      flavorDescription: beerData.flavorDescription || "", 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await beerService.getBeerById(beerId);
        console.log(beerData);
        setBeerData(response);
      } catch (err) {
        console.log("Error getting beer data: ", err);
      }
    };

    fetchData();
  }, [])

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Naziv"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="alcoholPercentage"
          name="alcoholPercentage"
          label="Postotak alkohola"
          value={formik.values.alcoholPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.alcoholPercentage && Boolean(formik.errors.alcoholPercentage)}
          helperText={formik.touched.alcoholPercentage && formik.errors.alcoholPercentage}
        />
        <TextField
          fullWidth
          id="color"
          name="color"
          label="Boja"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.color && Boolean(formik.errors.color)}
          helperText={formik.touched.color && formik.errors.color}
        />
        <TextField
          fullWidth
          id="averagePrice"
          name="averagePrice"
          label="Prosječna cijena"
          value={formik.values.averagePrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.averagePrice && Boolean(formik.errors.averagePrice)}
          helperText={formik.touched.averagePrice && formik.errors.averagePrice}
        />
        <TextField
          fullWidth
          id="rating"
          name="rating"
          label="Ocjena"
          value={formik.values.rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rating && Boolean(formik.errors.rating)}
          helperText={formik.touched.rating && formik.errors.rating}
        />
        <TextField
          fullWidth
          id="flavorDescription"
          name="flavorDescription"
          label="Opis okusa"
          value={formik.values.flavorDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.flavorDescription && Boolean(formik.errors.flavorDescription)}
          helperText={formik.touched.flavorDescription && formik.errors.flavorDescription}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
