import React from "react";
import styles from "./Cell.module.css";

const Cell = (props) => {
  const { isLive } = props;

  const color = {
    backgroundColor: isLive ? "white": "black",
  };
  return <div style={color} className={styles.cell}></div>;
};

export default Cell;
