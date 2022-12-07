import React from "react";
import { ShopstoryButton } from "@shopstory/core/types";
import css from "./Button.module.css";

export type ButtonProps = {
  variant: "dark" | "light" | "dark-outline" | "light-outline"
}

export const Button : ShopstoryButton<ButtonProps> = (props) => {
  const { as, variant, ...restProps } = props;

  let extraClass = "";
  if (variant === "light") {
    extraClass = css["Button--light"];
  } else if (variant === "dark-outline") {
    extraClass = css["Button--outline"];
  } else if (variant === "light-outline") {
    extraClass = css["Button--light-outline"]
  }

  return React.createElement(as ?? "div", { ...restProps, className: `${css.Button} ${extraClass}` }, props.label)
}