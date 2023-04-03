import React, { FC, ReactNode } from "react";
import * as ReactDOM from "react-dom";

export const ToastPortal: FC<{ children: ReactNode }> = ({ children }) => {
  if (typeof window === "object") {
    const toastRoot =
      document.getElementById("toastContainer") ||
      document.createElement("div");
    toastRoot.className = "toastContainer";

    return ReactDOM.createPortal(children, toastRoot);
  }
  return null;
};
