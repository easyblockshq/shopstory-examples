import React from "react";
import * as sharedStyles from "../shared.module.css";

export const MockHeader: React.FC = () => {
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px dashed black" }}>
      <div className={sharedStyles.container}>Page header</div>
    </div>
  );
};
