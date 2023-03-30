import React from "react";
import { ShopstoryButton } from "@shopstory/react";
import styles from "./Button.module.css";
export type ButtonProps = {
  variant: "dark" | "light" | "dark-outline" | "light-outline";
};

export const Button: ShopstoryButton<ButtonProps> = (props) => {
  const { as, variant, label, ...restProps } = props;

  let extraClass = "";
  if (variant === "light") {
    extraClass = styles.light;
  } else if (variant === "dark-outline") {
    extraClass = styles.outline;
  } else if (variant === "light-outline") {
    extraClass = styles.lightOutline;
  }

  return React.createElement(
    as ?? "div",
    { ...restProps, className: `${styles.wrapper} ${extraClass}` },
    props.label
  );
};
