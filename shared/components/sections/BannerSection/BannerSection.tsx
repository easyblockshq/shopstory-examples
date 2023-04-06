import styles from "./BannerSection.module.css";
import Image from "next/image";
import { Button } from "../../Button/Button";
import Link from "next/link";

export type BannerSectionProps = {
  title: string;
  description: string;
  image?: {
    src: string;
    width?: number;
    height?: number;
    title: string;
  };
  button?: {
    url: string;
    label: string;
  };
  disableInternalMargins?: boolean;
};

export const BannerSection: React.FC<BannerSectionProps> = (props) => {
  const wrapperClassNames = [styles.wrapper];

  if (props.disableInternalMargins) {
    wrapperClassNames.push(styles.disableInternalMargins);
  }

  return (
    <div className={wrapperClassNames.join(" ")}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.description}>{props.description}</div>
          {props.button && (
            <div className={styles.button}>
              <Link
                href={props.button.url}
                passHref={true}
                legacyBehavior={true}
              >
                <Button appearance={"solidBlack"} as={"a"}>
                  {props.button.label}
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            {props.image && (
              <Image
                src={props.image.src}
                width={props.image.width}
                height={props.image.height}
                layout={"fill"}
                objectFit={"cover"}
                alt={props.image.title}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
