"use client";

import { useContext } from "react";
import { CartContext } from "@/components/cart-provider";

export const useCart = () => useContext(CartContext);
