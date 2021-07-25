import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants/constants.js";
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
  const [optionCounts, setOptionsCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotals = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotals + toppingsSubtotal;

    setTotals({
      scoops: scoopsSubtotals,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  // will memorize the values and block not needed recalculation
  const value = useMemo(() => {
    //setter function
    function updateItemCount(itemName, newItemCounts, optionType) {
      const newOptionCounts = { ...updateItemCount };

      // updating option count
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCounts));

      setOptionsCount(newOptionCounts);
    }

    //getter: object containing options counts for scoops and toppings
    // contain as well totals and subtotals

    // setters: updateOptionCount

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
