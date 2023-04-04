import "../styles/globals.css";
import Context from "../src/context/context";
// import Nav from "../src/components/nav";

export default function App({ Component, pageProps }) {
  return (
    <Context>
      {/* <Nav  {...pageProps}/> */}
      <Component {...pageProps} />
    </Context>
  );
}
