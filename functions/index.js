const { onRequest } = require("firebase-functions/v2/https"); // Import the onRequest function from Firebase HTTPS functions
const logger = require("firebase-functions/logger"); // Import the Firebase logger for logging
const express = require("express"); // Import the Express framework
const cors = require("cors"); // Import the CORS middleware
const dotenv = require("dotenv"); // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config(); // Load the .env file and set environment variables

const stripe = require("stripe")(process.env.STRIPE_KEY); // Initialize Stripe with the secret key from environment variables

// Initialize Express app
const app = express(); // Create an Express application
app.use(cors({ origin: true })); // Enable CORS with any origin
app.use(express.json()); // Use JSON middleware to parse JSON bodies

// Root route for testing
app.get("/", (req, res) => {
  // Define a GET route at the root URL
  res.status(200).json({
    message: "success !", // Respond with a success message
  });
});

// Route to create payment
app.post("/payment/create", async (req, res) => {
  // Define a POST route for creating a payment
  const total = parseInt(req.query.total); // Parse the total amount from the query parameters

  if (total > 0) {
    // Check if the total amount is greater than 0
    // try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Set the payment amount
      currency: "usd", // Set the currency to USD
    });
    console.log(paymentIntent); // Log the payment intent object
    res.status(201).json({ clientSecret: paymentIntent.client_secret }); // Respond with the client secret
  } else {
    res.status(403).json({
      message: "total must be greater than 0", // Respond with an error message if the total is not greater than 0
    });
  }
});

// Export the Express app as a Firebase Function
exports.api = onRequest(app); // Export the Express app as an HTTPS function for Firebase
