import React from "react";
import styles from "./PageTitle.module.css";

const PageTitle = () => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>ldial</h1>
      <p className={styles.subtitle}>
        Listen to the best independent and community radio stations in the US
      </p>
    </div>
  );
};

export default PageTitle;
