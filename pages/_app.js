import "../styles/globals.css";
import Context from "../src/context/context";

export default function App({ Component, pageProps }) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
}
