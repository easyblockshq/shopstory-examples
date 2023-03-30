import React from "react";
import type { HeadFC } from "gatsby";
import styles from "../styles/Home.module.css";
import "../styles/globals.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://shopstory.app">Shopstory!</a>
        </h1>
      </main>
    </div>
  );
}

export default HomePage;

export const Head: HeadFC = () => <title>Shopstory demo</title>;
