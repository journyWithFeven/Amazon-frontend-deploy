// AccountAndListsPage.jsx
import React from "react";
import classes from "./AccountAndListsPage.module.css"; // Import CSS module for styling

const AccountAndListsPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Account & Lists</h1>
      </div>

      <div className={classes.content}>
        <div className={classes.section}>
          <h2>Hello, User!</h2>
          <p>
            Manage your account settings and view your orders and other details
            here.
          </p>
        </div>

        <div className={classes.section}>
          <h3>Your Lists</h3>
          <ul>
            <li>
              <a href="/wishlist">Wishlist</a>
            </li>
            <li>
              <a href="/shopping-list">Shopping List</a>
            </li>
          </ul>
        </div>

        <div className={classes.section}>
          <h3>Account Settings</h3>
          <ul>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/addresses">Addresses</a>
            </li>
            <li>
              <a href="/payment-methods">Payment Methods</a>
            </li>
          </ul>
        </div>

        <div className={classes.section}>
          <h3>Orders</h3>
          <ul>
            <li>
              <a href="/orders">Your Orders</a>
            </li>
            <li>
              <a href="/returns">Returns & Replacements</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountAndListsPage;
