import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants/constants.js";
import { formatCurrency } from "../utilities/index.js";

const OrderDetails = createContext();

// Custom hook - to check if we are inside a provide
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  // it mean we are not in provide so it will be useless for us

  if (!context) {
    throw new Error(
      "usOrderDetails must be used withing an OrderDetailsProvide"
    );
  }

  return context;
}

// HELPER FUNCTION
function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotals = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotals + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotals),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  // will memorize the values and block not needed recalculation
  const value = useMemo(() => {
    //setter function
    // function updateItemCount(itemName, newItemCounts, optionType) {
    //   const newOptionCounts = { ...updateItemCount };

    //   // updating option count
    //   const optionCountsMap = optionCounts[optionType];
    //   optionCountsMap.set(itemName, parseInt(newItemCounts));

    //   setOptionsCount(newOptionCounts);
    // }

    function updateItemCount(itemName, newItemCount, optionType) {
      // // get option Map and make a copy -shallow copy
      // const newOptionCounts = { ...optionCounts };
      // // reference
      // const optionCountsMap = newOptionCounts[optionType];
      // optionCountsMap.set(itemName, parseInt(newItemCount));
      // // update state
      // setOptionCounts(newOptionCounts);

      // update with previous state
      setOptionCounts((prevState) => {
        // get option Map and make a copy
        const { [optionType]: optionMap } = prevState;
        const newOptionMap = new Map(optionMap);
        // update the copied Map
        newOptionMap.set(itemName, parseInt(newItemCount));
        // create new object with the old optionCounts plus new map
        const newOptionCounts = { ...prevState };
        newOptionCounts[optionType] = newOptionMap;
        return newOptionCounts;
      });
    }

    //getter: object containing options counts for scoops and toppings
    // contain as well totals and subtotals

    // setters: updateOptionCount

    //reset function
    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
