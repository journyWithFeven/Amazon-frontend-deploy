import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import ShippingMessage from "./Components/ShippingMessage/ShippingMessage";
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log("User is signed in:", authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // console.log("No user is signed in");
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // return () => unsubscribe();
  }, []);

  return (
    <div>
      <Routing />
      <ShippingMessage />
    </div>
  );
}

export default App;
