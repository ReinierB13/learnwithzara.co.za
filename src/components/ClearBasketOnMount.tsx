"use client";

import { useEffect } from "react";
import { writeBasket } from "@/lib/basket";

export default function ClearBasketOnMount() {
  useEffect(() => {
    writeBasket([]);
  }, []);

  return null;
}
