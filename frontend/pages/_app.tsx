import "../styles/global.sass";
import { AppProps } from "next/app";
import { Navbar } from "../src/components/Navbar";
import { AuthenticationContextProvider } from "../src/contexts/AuthenticationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <AuthenticationContextProvider>
        <Navbar />
        <div className="container mt-3">
          <Component {...pageProps} />
        </div>
      </AuthenticationContextProvider>
    </>
  );
}
