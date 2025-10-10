import "@/styles/globals.css";
import { initialize } from "@flexiformal/ftml-react";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

let flamsInitialized = false;
const initStartTime = Date.now();
const FLAMS_URL = process.env.NEXT_PUBLIC_FLAMS_URL ?? "https://mmt.beta.vollki.kwarc.info"; // "https://mathhub.info"
// this code runs earlier if its not in the useEffect
initialize(FLAMS_URL, "WARN")
  .then(() => {
    console.log("FTML initialized: ", Date.now() - initStartTime, "ms");
    flamsInitialized = true;
  })
  .catch((err) => {
    console.error(
      `FTML initialization failed: [${process.env.NEXT_PUBLIC_FLAMS_URL}]`,
      err
    );
  });


export const ReadyToRender = createContext<boolean>(
    false
);

export default function App({ Component, pageProps }: AppProps) {
  const [readyToRender, setReadyToRender] = useState(false);
  const interval = setInterval(() => {
    if (flamsInitialized) {
      setReadyToRender(true);
      clearInterval(interval);
    }
  }, 10);
  return <ReadyToRender.Provider value={readyToRender}><Component {...pageProps} /></ReadyToRender.Provider>;
}
