"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
