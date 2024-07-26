import React, { createContext, useContext, useState } from "react";

// Create a context for the color
const ColorContext = createContext();

export const useColor = () => {
  return useContext(ColorContext);
};

// Create a context for the theme
export const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mode: "light",
    color: "#ffffff", // default color for light mode
  });

  // Function to toggle the theme mode
  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      mode: prevTheme.mode === "light" ? "dark" : "light",
      color: prevTheme.mode === "light" ? "#000000" : "#ffffff", // color for dark mode
    }));
  };

  // Function to change the color
  const changeColor = (color) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      color: color,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, changeColor }}>
      <ColorContext.Provider value={{ color: theme.color, changeColor }}>
        {children}
      </ColorContext.Provider>
    </ThemeContext.Provider>
  );
};
