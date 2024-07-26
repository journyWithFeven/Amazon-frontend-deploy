import React from "react";
import numeral from "numeral";

const CurrencyFormat = ({ amount }) => {
  const formattedAmount = numeral(amount).format("$0,0.00");
  return <div>{formattedAmount}</div>;
};
export default CurrencyFormat;

// // Import format from date-fns library
// import { format } from 'date-fns';
// const formatDate = (date) => {
//   try {
//     return format(new Date(date), 'MM - dd - yyyy | HH:mm:ss a');
//   } catch (error) {
//     console.error('Invalid date', error);
//     return 'Invalid date';
//   }
// };
// export default formatDate;
