import React, { ReactNode } from "react";
import { Header } from "./Header";
import styles from "./layout.module.css";
import {} from "@next/font/google";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
