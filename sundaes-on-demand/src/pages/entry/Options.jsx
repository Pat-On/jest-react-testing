import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

import ScoopOptions from "./ScoopOptions";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

export default function Option({ optionType }) {
  const [items, setItems] = useState([]);
  // storing error
  const [error, setError] = useState(false);

  // option type is scoop or toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  //   TODO: null replace by ToppingOptions
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;

  //   array of data to array of components
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
