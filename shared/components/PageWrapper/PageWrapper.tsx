import { ReactNode } from "react";
import styles from "./pageWrapper.module.css";

export const PageWrapper: React.FC<{ children: ReactNode }> = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};
