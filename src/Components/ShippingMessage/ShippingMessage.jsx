import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./ShippingMessage.module.css"; // Ensure this file exists

const ShippingMessage = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const [deliveryCountry, setDeliveryCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const detectedCountry = response.data.country_name;
        setCountry(detectedCountry);
        setDeliveryCountry(detectedCountry);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the geolocation data:", error);
        setLoading(false);
      });
  }, []);

  const handleDismiss = () => {
    setShowMessage(false);
  };

  const handleCountryChange = (e) => {
    setDeliveryCountry(e.target.value);
  };

  if (!showMessage) return null;

  return (
    <div className={classes.messageContainer}>
      {loading ? (
        <div>Determining your location...</div>
      ) : country ? (
        <div>
          {`We're showing you items that ship to ${deliveryCountry}. To see items that ship to a different country, change your delivery address.`}
          <div className={classes.actions}>
            <button onClick={handleDismiss} className={classes.dismissButton}>
              Dismiss
            </button>
            <input
              type="text"
              value={deliveryCountry}
              onChange={handleCountryChange}
              placeholder="Change delivery country"
              className={classes.countryInput}
            />
          </div>
        </div>
      ) : (
        "Unable to determine your location."
      )}
    </div>
  );
};

export default ShippingMessage;
