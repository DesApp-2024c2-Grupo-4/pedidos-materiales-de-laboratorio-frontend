import React, { ReactElement, useEffect } from "react";
import "./styles.scss";
import useMaterialService from "../../services/material.service";

export default function Home(): ReactElement {
  const { addMaterial } = useMaterialService();

  useEffect(() => {
    addMaterial({
      description: "material falso",
      unitMeasure: "u",
      type: "falso",
      stock: 123,
      isAvailable: true,
      inUse: [],
    }).catch((e) => console.error(e));
  });
  return <div>home</div>;
}
