import React, { useState, useEffect } from "react";
import styles from "./DeliveryLocationPage.module.css";

const DeliveryLocationPage = () => {
  const [zipCode, setZipCode] = useState("");
  const [location, setLocation] = useState("Loading...");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = [
        { code: "ET", name: "Ethiopia" },
        { code: "US", name: "United States" },
        // Add other countries here
      ];
      setCountryList(countries);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await fetch(
                `https://api.ipapi.com/api/reverse?access_key=YOUR_API_KEY&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();

              if (data && data.country_name) {
                setLocation(data.country_name);
              } else {
                setLocation("Unknown Location");
              }
            } catch (error) {
              console.error("Error fetching location:", error);
              setLocation("Error fetching location");
            }
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setLocation("Error fetching location");
          }
        );
      } else {
        setLocation("Geolocation not supported");
      }
    };

    fetchLocation();
  }, []);

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleApplyClick = () => {
    alert(`Applied location: ${location} (Zip Code: ${zipCode})`);
  };

  return (
    <div className={styles.container}>
      <h1>Choose your location</h1>
      <p>
        Delivery options and delivery speeds may vary for different locations
      </p>
      <button className={styles.signInButton}>
        Sign in to see your addresses
      </button>

      <hr className={styles.separator} />
      <p className={styles.separatorText}>or enter a US zip code</p>
      <div className={styles.zipCodeContainer}>
        <input
          type="text"
          value={zipCode}
          onChange={handleZipCodeChange}
          placeholder="Enter a US zip code"
          className={styles.zipInput}
        />
        <button onClick={handleApplyClick} className={styles.applyButton}>
          Apply
        </button>
      </div>

      <hr className={styles.separator} />
      <p className={styles.separatorText}>or</p>
      <div className={styles.countryContainer}>
        <select
          className={styles.countrySelect}
          value={location}
          onChange={handleLocationChange}
        >
          {countryList.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => alert(`Location set to ${location}`)}
          className={styles.doneButton}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DeliveryLocationPage;
