import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../../Store/Redux-Store/store";
import { addTask } from "../../Store/Redux-Store/tasksSlice";

export let rendered = null;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}
