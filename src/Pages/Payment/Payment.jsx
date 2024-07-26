import React, { useContext, useState } from "react"; // Import necessary modules from React.
import classes from "./Payment.module.css"; // Import CSS module for styling.
import Layout from "../../Components/Layout/Layout"; // Import Layout component.
import { DataContext } from "../../Components/DataProvider/DataProvider"; // Import DataContext for state management.
import ProductCard from "../../Components/Product/ProductCard"; // Import ProductCard component.
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"; // Import Stripe elements.
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat"; // Import CurrencyFormat component.
import { axiosInstance } from "../../Api/axios"; // Import axios instance for API calls.
import { ClipLoader } from "react-spinners"; // Import ClipLoader for loading spinner.
import { db } from "../../Utility/firebase"; // Import Firestore database.
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation.

// -------------------------------//---------------------------
// -------------------------------//---------------------------
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext); // Get user and basket data from context.

  //-------------------------------------------------------
  // Calculate total items in the basket...From Header
  //-------------------------------------------------------
  const totalItems = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  //-------------------------------------------------------
  // Calculate total price of items in the basket....from cart
  //-------------------------------------------------------
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  //-------------------------------------------------------
  // State for processing payment.
  //-------------------------------------------------------
  const [processing, setProcessing] = useState(false);

  //-------------------------------------------------------
  // --------------from Router--from stripe react--Hook----
  //-------------------------------------------------------
  const stripe = useStripe(); // Get stripe instance.
  const elements = useElements(); // Get stripe elements instance.
  const navigate = useNavigate; // Get navigate function.

  //------------------------------------------------------------
  //-------------------- delivery address ---------------------
  //------------------------------------------------------------

  const [address, setAddress] = useState({
    // State for delivery address.
    email: user?.email || "", // Default email from user context.
    street: "", // Street address.
    city: "", // City.
    state: "", // State.
    zip: "", // ZIP code.
  });
  //------------------------------------------------------------
  //------------------- Payment Method--------------------------
  //------------------------------------------------------------

  //----------------------------- card-------------------------
  // Handle change event for CardElement.
  // to check the card input correctness
  //------------------------------------------------------------
  const [cardError, setCardError] = useState(null); // State for card errors.

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };
  //------------------------------------------------------------
  //-------------- Handle payment submission -------------------
  // cd functions---npm run serve(to get the local link)----
  //------------------------------------------------------------
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // --------------------------------------------------
      // Set processing state to true.
      // --------------------------------------------------
      setProcessing(true);
      // --------------------------------------------------
      // step 1
      // backend || function ---> contact to get the client secret
      // --------------------URL-----------------------------
      // axiosInstance(base url)+url(/payment/create?total=${total * 100})
      const response = await axiosInstance({
        // Send request to backend to create payment intent.
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret; // Get client secret from response.
      // --------------------------------------------------
      // step 2
      //------------ Confirm card payment using Stripe -----
      // --------------------------------------------------
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);
      // --------------------------------------------------
      // step 3
      // order firestore database save, clear basket
      // to use firestore on the firebase on browser
      // Save order to Firestore database.
      // --------------------------------------------------
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // --------------------------------------------------
      // empty the basket
      // Dispatch action to clear the basket.
      // --------------------------------------------------
      dispatch({ type: Type.EMPTY_BASKET });
      // --------------------------------------------------
      // Set processing state to false.
      // --------------------------------------------------
      setProcessing(false);
      
      // --------------------------------------------------
      // Navigate to orders page with message.
      // --------------------------------------------------
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      // console.log(error);
    }
    setProcessing(false); // Set processing state to false.
  };
  // -------------------------------//---------------------------
  // -------------------------------//---------------------------
  return (
    <Layout>
      {/* ----------------------------------------------------- */}
      {/* ---------------- Payment section ---------------------*/}
      {/* ----------------------------------------------------- */}
      {/*-------------- Payment header section -----------------*/}
      <div className={classes.payment_header}>
        {" "}
        Checkout ({totalItems}) items
      </div>
      {/* ----------------------------------------------------- */}
      {/*------------- Delivery address section ----------------*/}
      {/* ----------------------------------------------------- */}
      <section className={classes.payment}>
        {" "}
        <div className={classes.flex}>
          {" "}
          <h3>Delivery Address</h3>
          <div>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
          {/* <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={address.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={address.zip}
              onChange={handleInputChange}
              required
            />
          </div> */}
        </div>
        <hr />
      </section>
      <hr />
      {/* ----------------------------------------------------- */}
      {/*----------- Review items section ----------------------*/}
      {/* ----------------------------------------------------- */}
      <div className={classes.flex}>
        {" "}
        <h3>Review items and delivery</h3>
        <div>
          {/* it render the product card for each item... Map through basket items and display ProductCard. */}
          {basket?.map((item, index) => (
            <ProductCard key={index} product={item} flex={true} />
          ))}
        </div>
      </div>
      <hr />
      {/* ----------------------------------------------------- */}
      {/*------------- Payment methods section -----------------*/}
      {/* ----------------------------------------------------- */}
      <div className={classes.flex}>
        {" "}
        <h3>Payment methods</h3>
        <div className={classes.payment_card_container}>
          {" "}
          {/*---------------------------------------------- */}
          {/*------- Card payment container ---------------*/}
          {/*---------------------------------------------- */}
          <div className={classes.payment_details}>
            {" "}
            {/* ------------------------------------------------*/}
            {/*stripe for secured the payment system on client side*/}
            {/* -------------------------------------------------*/}
            {/* ------------- Payment details form ------------- */}
            {/*---------------------------------------------- */}
            <form onSubmit={handlePayment}>
              {cardError && ( // Display card error if exists.
                <small style={{ color: "red" }}>{cardError} </small>
              )}
              {/*------------------------------------------------- */}
              {/* --------call CardElement for card input--------- */}
              {/*------------------------------------------------- */}
              <CardElement onChange={handleChange} /> {/*  */}
              {/*---------------------------------------------- */}
              {/*------------- Total order price ---------------*/}
              {/*---------------------------------------------- */}
              <div className={classes.payment_price}>
                {" "}
                <div>
                  {/*---------------------------------------------- */}
                  {/*Display total order amount through CurrencyFormat*/}
                  {/*---------------------------------------------- */}
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total Order</p> | <CurrencyFormat amount={total} />{" "}
                  </span>
                </div>
                {/*---------------------------------------------- */}
                {/*---------- Submit payment button --------------*/}
                {/*---------------------------------------------- */}
                <button type="submit">
                  {" "}
                  {/*---------------------------------------------- */}
                  {/* ---- Show loading spinner if processing ----- */}
                  {/*---------------ClipLoader--------------------- */}
                  {processing ? (
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={12} />
                      <p>Please Wait ...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Payment; // Export Payment component.
