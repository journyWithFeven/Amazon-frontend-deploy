import { Type } from "./action.type"; // Import action types.

export const initialState = {
  basket: [], // Initial state with an empty basket.
  user: null,
};

export const reducer = (state, action) => {
  // Reducer function.
  switch (action.type) {
    case Type.ADD_TO_BASKET: // Handle ADD_TO_BASKET action.
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      ); // Check if item exists.
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }], // Add new item with amount 1.
        };
      } else {
        const updatedBasket = state.basket.map(
          (item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item // Update item amount.
        );
        return {
          ...state,
          basket: updatedBasket, // Update basket with new amounts.
        };
      }
    case Type.REMOVE_FROM_BASKET: // Handle REMOVE_FROM_BASKET action.
      const index = state.basket.findIndex((item) => item.id === action.id); // Find item index.
      let newBasket = [...state.basket]; // Copy basket.

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          }; // Decrease item amount.
        } else {
          newBasket.splice(index, 1); // Remove item if amount is 1.
        }
      }
      return {
        ...state,
        basket: newBasket, // Update basket.
      };

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state; // Return current state for unknown action types.
  }
};
