import type { AppProps } from "next/app";
import HeaderNavigation from "../components/HeaderNavigation";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <HeaderNavigation />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
