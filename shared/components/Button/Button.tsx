import React from "react";
import styles from "./Button.module.css";
import type { ShopstoryButton } from "@shopstory/react";

type ButtonProps = {
  appearance?:
    | "naked"
    | "solidBlack"
    | "solidWhite"
    | "solidGrey"
    | "outlineBlack"
    | "underlinedBlack"
    | "extraSmall";
  size?: "standard" | "small" | "medium";
};

export const Button: ShopstoryButton<ButtonProps> = (props) => {
  const {
    children,
    as,
    appearance = "naked",
    size,
    className,
    label,
    ...restProps
  } = props;

  let classes = [];

  if (className) {
    classes.push(className);
  }

  if (appearance) {
    classes.push(styles[appearance]);
  }

  if (size) {
    switch (size) {
      case "small":
        classes.push(styles.sizeSmall);
        break;
      case "medium":
        classes.push(styles.sizeMedium);
        break;
    }
  }

  const tag = props.as ?? "button";

  return React.createElement(
    tag,
    { ...restProps, className: classes.join(" ") },
    label ?? children
  );
};
