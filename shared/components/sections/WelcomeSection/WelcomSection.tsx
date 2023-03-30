import styles from "./WelcomSection.module.css";

export const WelcomSection: React.FC<{ children: any }> = (props) => {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  );
};
