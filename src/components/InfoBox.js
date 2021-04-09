import React from "react";
import "../css/InfoBox.css";

function InfoBox({ title, cases, total, ...props }) {
  return (
    <div className="infoBox" onClick={props.onClick}>
      <div className="infoBox_title">{title}</div>
      <h2 className="infoBox_cases">{cases}</h2>
      <div className="infoBox_total">{total} Total</div>
    </div>
  );
}

export default InfoBox;
