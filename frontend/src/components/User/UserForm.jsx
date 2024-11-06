import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string("Unesi polje").required("Polje je obavezno"),
  firstName: yup.string("Unesi polje").required("Polje je obavezno"),
  lastName: yup.string("Unesi polje").required("Polje je obavezno"),
  email: yup.string("Unesi polje").required("Polje je obavezno"),
  country: yup.string("Unesi polje").required("Polje je obavezno"),
});

export default function UserForm({ userData, handleSubmit }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: userData.username || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      country: userData.country || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        required
        fullWidth
        error={formik.touched.username && Boolean(formik.errors.username)}
        margin="normal"
      >
        <FormLabel htmlFor="username">Korisničko ime</FormLabel>
        <OutlinedInput
          name="username"
          type="string"
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.username && formik.errors.username}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        margin="normal"
      >
        <FormLabel htmlFor="firstName">Ime</FormLabel>
        <OutlinedInput
          name="firstName"
          type="string"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        margin="normal"
      >
        <FormLabel htmlFor="lastName">Prezime</FormLabel>
        <OutlinedInput
          name="lastName"
          type="string"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.email && Boolean(formik.errors.email)}
        margin="normal"
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <OutlinedInput
          name="email"
          type="string"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.email && formik.errors.email}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={formik.touched.country && Boolean(formik.errors.country)}
        margin="normal"
      >
        <FormLabel htmlFor="country">Država</FormLabel>
        <OutlinedInput
          name="country"
          type="string"
          id="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.country && formik.errors.country}
        />
      </FormControl>

      <Button
        sx={{ marginTop: 5 }}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Spremi
      </Button>
    </form>
  );
}
