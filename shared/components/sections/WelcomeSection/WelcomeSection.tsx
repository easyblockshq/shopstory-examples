import styles from "./WelcomeSection.module.css";

export const WelcomeSection: React.FC<{ children: any }> = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};
