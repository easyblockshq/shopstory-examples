import styles from "./TwoColumnsSection.module.css";
import { Button } from "../../Button/Button";
import Link from "next/link";

export type TwoColumnsSectionProps = {
  leftText: string;
  rightText: string;
  button?: {
    url: string;
    label: string;
  };
};

export const TwoColumnsSection: React.FC<TwoColumnsSectionProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.leftText}>{props.leftText}</div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.rightText}>{props.rightText}</div>
          {props.button && (
            <div className={styles.buttonWrapper}>
              <Link href={props.button.url} passHref legacyBehavior>
                <Button appearance={"outlineBlack"} as={"a"}>
                  {props.button.label}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
