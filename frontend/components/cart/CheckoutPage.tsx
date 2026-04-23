// app/checkout/page.tsx
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCart } from "@/core/context/CartContext";
import { CurrencyContext } from "@/core/context/CurrencyContext";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Card,
  Chip,
  Fade,
  Grow,
} from "@mui/material";
import {
  CreditCard,
  Lock,
  LocalShipping,
  Payment,
  CheckCircle,
  ArrowBack,
  ArrowForward,
  ShoppingBag,
} from "@mui/icons-material";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Validation schema
const checkoutSchema = yup.object({
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

type CheckoutFormData = yup.InferType<typeof checkoutSchema>;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();
  const { currency } = React.useContext(CurrencyContext);
  const [clientSecret, setClientSecret] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      phone: "",
      saveInfo: false,
    },
  });

  const watchedFields = watch();

  useEffect(() => {
    const savedInfo = localStorage.getItem("checkoutInfo");
    if (savedInfo) {
      const parsed = JSON.parse(savedInfo);
      Object.keys(parsed).forEach((key) => {
        setValue(key as keyof CheckoutFormData, parsed[key]);
      });
      setValue("saveInfo", true);
    }
  }, [setValue]);

  const getNumericPrice = (price: any) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    return parseFloat(String(price).replace(/[^0-9.]/g, ""));
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      fetch("http://localhost:8080/api/v1/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            name: item.name,
            price: getNumericPrice(item.price),
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + getNumericPrice(item.price) * item.quantity;
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const formatPrice = (price: number) => {
    switch (currency) {
      case "EUR": return `€${(price * 0.92).toFixed(2)}`;
      case "GBP": return `£${(price * 0.79).toFixed(2)}`;
      case "CAD": return `C$${(price * 1.35).toFixed(2)}`;
      case "PKR": return `Rs ${(price * 278).toFixed(0)}`;
      default: return `$${price.toFixed(2)}`;
    }
  };

  const steps = ["Contact Info", "Shipping Address", "Payment"];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!watchedFields.email || !watchedFields.firstName || !watchedFields.lastName || !watchedFields.phone) {
        alert("Please fill all required fields");
        return;
      }
    } else if (activeStep === 1) {
      if (!watchedFields.address || !watchedFields.city || !watchedFields.state || !watchedFields.postalCode) {
        alert("Please fill all address fields");
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    if (!stripe || !elements || !clientSecret) {
      setPaymentError("Payment system not ready");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    if (data.saveInfo) {
      const infoToSave = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      };
      localStorage.setItem("checkoutInfo", JSON.stringify(infoToSave));
    }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: {
              line1: data.address,
              line2: data.apartment,
              city: data.city,
              state: data.state,
              postal_code: data.postalCode, // Fixed: changed from postalCode to postal_code
              country: data.country, // Now using valid ISO code (e.g., 'US', 'GB', 'PK')
            },
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        setPaymentSuccess(true);
        setTimeout(() => {
          window.location.href = "/success";
        }, 2000);
      }
    } catch (error) {
      setPaymentError("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Paper sx={{ p: 6, textAlign: "center" }}>
        <ShoppingBag sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
        <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
        <Button href="/products" variant="contained" color="primary">
          Continue Shopping
        </Button>
      </Paper>
    );
  }

  if (paymentSuccess) {
    return (
      <Fade in={true}>
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
          <Typography variant="h5" gutterBottom>Payment Successful!</Typography>
          <Typography variant="body2" color="text.secondary">
            Redirecting you to order confirmation...
          </Typography>
          <CircularProgress size={30} sx={{ mt: 2 }} />
        </Paper>
      </Fade>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}> 
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Grow in={true}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Payment fontSize="small" color="primary" />
                    Contact Information
                  </Typography>
                  
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email Address"
                        type="email"
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="First Name"
                            margin="normal"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Last Name"
                            margin="normal"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Phone Number"
                        margin="normal"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Box>
              </Grow>
            )}

            {activeStep === 1 && (
              <Grow in={true}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalShipping fontSize="small" color="primary" />
                    Shipping Address
                  </Typography>

                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Street Address"
                        margin="normal"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    )}
                  />

                  <Controller
                    name="apartment"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Apartment, suite, etc. (optional)"
                        margin="normal"
                      />
                    )}
                  />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="City"
                            margin="normal"
                            error={!!errors.city}
                            helperText={errors.city?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}> 
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="State/Province"
                            margin="normal"
                            error={!!errors.state}
                            helperText={errors.state?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}> 
                      <Controller
                        name="postalCode"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Postal Code"
                            margin="normal"
                            error={!!errors.postalCode}
                            helperText={errors.postalCode?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}> {/* Changed from item xs=6 */}
                      <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Country"
                            margin="normal"
                            placeholder="Enter 2-letter country code (e.g., US, GB, PK)"
                            error={!!errors.country}
                            helperText={errors.country?.message || "Use 2-letter code: US, GB, PK, etc."}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Controller
                    name="saveInfo"
                    control={control}
                    render={({ field }) => (
                      <Box sx={{ mt: 2 }}>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          id="saveInfo"
                        />
                        <label htmlFor="saveInfo" style={{ marginLeft: "8px" }}>
                          Save my information for faster checkout
                        </label>
                      </Box>
                    )}
                  />
                </Box>
              </Grow>
            )}

            {activeStep === 2 && (
              <Grow in={true}>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CreditCard fontSize="small" color="primary" />
                    Payment Details
                  </Typography>

                  <Card variant="outlined" sx={{ p: 2, mt: 2, bgcolor: "#fafafa" }}>
                    <Typography variant="body2" gutterBottom>Card Information</Typography>
                    <Box sx={{ 
                      p: 2, 
                      border: "1px solid #e0e0e0", 
                      borderRadius: 2, 
                      bgcolor: "white",
                      "&:focus-within": {
                        borderColor: "primary.main",
                        boxShadow: "0 0 0 2px rgba(103, 110, 234, 0.2)",
                      }
                    }}>
                      <CardElement
                        options={{
                          hidePostalCode: true,
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Card>

                  {paymentError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {paymentError}
                    </Alert>
                  )}

                  <Alert severity="info" sx={{ mt: 2 }} icon={<Lock fontSize="small" />}>
                    Your payment information is encrypted and secure. We accept all major credit cards.
                  </Alert>
                </Box>
              </Grow>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBack />}
                variant="outlined"
              >
                Back
              </Button>
              {activeStep < 2 ? (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
                    },
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe || !clientSecret || isProcessing}
                  startIcon={isProcessing ? <CircularProgress size={20} /> : <Lock />}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
                    },
                  }}
                >
                  {isProcessing ? "Processing..." : `Pay ${formatPrice(calculateTotal())}`}
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid size={{ xs: 12, md: 5 }}> {/* Changed from item xs=12 md=5 */}
          <Paper sx={{ p: 3, borderRadius: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order Summary
            </Typography>

            <List sx={{ maxHeight: 400, overflow: "auto", mb: 2 }}>
              {cartItems.map((item) => (
                <ListItem key={`${item.id}-${item.size}-${item.color}`} sx={{ px: 0, alignItems: "flex-start" }}>
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="caption" component="div" color="text.secondary">
                          Size: {item.size || "N/A"} | Color: {item.color || "N/A"}
                        </Typography>
                        <Typography variant="caption" component="div" color="text.secondary">
                          Qty: {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {formatPrice(getNumericPrice(item.price))} each
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {formatPrice(getNumericPrice(item.price) * item.quantity)}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2">{formatPrice(calculateSubtotal())}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Shipping</Typography>
                <Typography variant="body2">
                  {calculateShipping() === 0 ? "Free" : formatPrice(calculateShipping())}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Tax (10%)</Typography>
                <Typography variant="body2">{formatPrice(calculateTax())}</Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                  {formatPrice(calculateTotal())}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #eee" }}>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
                <Chip icon={<Lock />} label="Secure" size="small" />
                <Chip label="SSL Encrypted" size="small" />
              </Box>
              <Typography variant="caption" component="div" color="text.secondary" align="center">
                Payment secured by Stripe
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;