import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
// import AccountAndListsPage from "./Components/AccountAndListsPage/AccountAndListsPage";
import Auth from "./Pages/Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import LanguageSettingsPage from "./Components/LanguageSelector/LanguageSettingsPage";
// import LanguageSelector from "./Components/LanguageSelector/LanguageSelector";

const stripePromise = loadStripe(
  "pk_test_51PdX3CRw2RDN1NOFui28G4yTBR8bdw1zoNX75MSgwOxXyNwJbSiEmxYyWXvUjox8YFuaoeG4NqIMWsQud9f6iH9D005XO9BE4K"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must log in to see your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/account-and-lists" element={<AccountAndListsPage />} /> */}
        <Route path="/account-and-lists" element={<Auth />} />
        <Route path="/language-settings" element={<LanguageSettingsPage />} />
      </Routes>
    </Router>
  );
}

export default Routing;
