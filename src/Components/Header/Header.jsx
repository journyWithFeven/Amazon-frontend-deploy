import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import DeliveryLocationPage from "./DeliveryLocationPage/DeliveryLocationPage"; // Import DeliveryLocationPage component

const Header = () => {
  const [{ user, basket }] = useContext(DataContext);
  const [country, setCountry] = useState("Loading...");
  const [showDeliveryLocation, setShowDeliveryLocation] = useState(false);

  const totalItems =
    basket?.reduce((amount, item) => item.amount + amount, 0) || 0;

  const handleSignOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setCountry(response.data.country_name);
      } catch (error) {
        console.error("Error fetching the country data:", error);
        setCountry("Unknown");
      }
    };

    fetchCountry();
  }, []);

  const handleDeliveryClick = () => {
    setShowDeliveryLocation(true);
  };

  const handleCloseDeliveryLocation = () => {
    setShowDeliveryLocation(false);
  };

  return (
    <>
      {showDeliveryLocation && (
        <div className={classes.deliveryModal}>
          <button
            className={classes.closeButton}
            onClick={handleCloseDeliveryLocation}
          >
            X
          </button>
          <DeliveryLocationPage />
        </div>
      )}
      <section className={classes.fixed}>
        <section className={classes.header}>
          <div className={classes.header_container}>
            <div className={classes.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="Amazon logo"
                />
              </Link>

              <div className={classes.delivery} onClick={handleDeliveryClick}>
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>Delivered to</p>
                  <span>{country}</span>
                </div>
              </div>
            </div>

            <div className={classes.search}>
              <select name="category" id="category">
                <option className={classes.searchAll} value="">
                  All
                </option>
              </select>
              <input type="text" placeholder="Search product" />
              <button type="submit">
                <BsSearch size={38} />
              </button>
            </div>

            <div className={classes.order_container}>
              <LanguageSelector />
              <Link to={!user && "/auth"}>
                <div>
                  {user ? (
                    <>
                      <p>Hello {user?.email?.split("@")[0]}</p>
                      <span onClick={handleSignOut}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, Sign In</p>
                      <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </Link>

              <Link to="/orders">
                <p>Returns</p>
                <span>& Orders</span>
              </Link>

              <Link to="/cart" className={classes.cart}>
                <BiCart size={35} />
                <span>{totalItems}</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    </>
  );
};

export default Header;
