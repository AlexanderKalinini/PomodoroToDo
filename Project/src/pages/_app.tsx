import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../../Store/Redux-Store/store";
import { Header } from "@/components/Layout/Header";

export let rendered = null;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}
