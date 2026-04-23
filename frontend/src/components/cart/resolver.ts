import * as yup from "yup";

export const checkoutSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  apartment: yup.string(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup.string().required("Postal code is required"),
  country: yup.string().required("Country is required"),
  phone: yup.string().required("Phone number is required"),
  saveInfo: yup.boolean(),
});