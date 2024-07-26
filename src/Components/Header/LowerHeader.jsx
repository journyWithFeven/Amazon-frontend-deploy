import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css";
import SlidingMenu from "./SlidingMenu/SlidingMenu"; // Import the SlidingMenu component

function LowerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={classes.lower_container}>
      <ul>
        <li onClick={handleMenuToggle}>
          <AiOutlineMenu size={30} />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
      {isMenuOpen && <SlidingMenu onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}

export default LowerHeader;
