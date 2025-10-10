import styles from "@/styles/Home.module.css";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { FTMLFragment } from "@flexiformal/ftml-react";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>FTML React Experiments</title>
        <meta name="description" content="FTML React Experiments Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: "flex", justifyContent: "center", margin: "1em 0" }}>
        <button 
          style={{ 
            padding: "2px 2px", 
            borderRadius: "2px", 
            backgroundColor: "blue", 
            color: "white",
            border: "none",
            cursor: "pointer"
          }} 
          onClick={() => router.push("/notes")}
        >
          Move to Notes
        </button>
      </div>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <h1>FTML React Experiments</h1>
          <p>[Fragment below]</p>
          <FTMLFragment
            fragment={{
              type: "FromBackend",
              uri: "https://mathhub.info?a=courses/FAU/AI/course&p=course/sec&d=concept&l=en&e=section/paragraph",
            }}
          />
          <p>[Fragment above]</p>
        </main>
      </div>
    </>
  );
}
