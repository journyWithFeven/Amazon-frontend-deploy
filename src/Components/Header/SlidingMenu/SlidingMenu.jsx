import React from "react";
import classes from "./SlidingMenu.module.css";

const SlidingMenu = ({ onClose }) => {
  return (
    <div className={classes.slidingMenu}>
      <button className={classes.closeButton} onClick={onClose}>
        X
      </button>
      <ul className={classes.menuList}>
        <li>
          <a href="#digital-content">Digital Content & Devices</a>
        </li>
        <li>
          <a href="#amazon-music">Amazon Music</a>
        </li>
        <li>
          <a href="#kindle">Kindle E-readers & Books</a>
        </li>
        <li>
          <a href="#appstore">Amazon Appstore</a>
        </li>
        <li>
          <a href="#shop-department">Shop by Department</a>
        </li>
        <li>
          <a href="#electronics">Electronics</a>
        </li>
        <li>
          <a href="#computers">Computers</a>
        </li>
        <li>
          <a href="#smart-home">Smart Home</a>
        </li>
        <li>
          <a href="#arts-crafts">Arts & Crafts</a>
        </li>
        <li>
          <a href="#see-all">See all</a>
        </li>
        <li>
          <a href="#programs-features">Programs & Features</a>
        </li>
        <li>
          <a href="#gift-cards">Gift Cards</a>
        </li>
        <li>
          <a href="#shop-interest">Shop By Interest</a>
        </li>
        <li>
          <a href="#amazon-live">Amazon Live</a>
        </li>
        <li>
          <a href="#international-shopping">International Shopping</a>
        </li>
        <li>
          <a href="#see-all-2">See all</a>
        </li>
        <li>
          <a href="#help-settings">Help & Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default SlidingMenu;
