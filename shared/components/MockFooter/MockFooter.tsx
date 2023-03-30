import React from "react";
import * as sharedStyles from "../shared.module.css";

export const MockFooter: React.FC = () => {
  return (
    <div
      style={{
        padding: "16px 0",
        borderTop: "1px dashed black",
        minHeight: "200px",
      }}
    >
      <div className={sharedStyles.container}>Page footer</div>
    </div>
  );
};
