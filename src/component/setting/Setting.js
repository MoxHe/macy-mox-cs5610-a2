import React, { useState } from "react";
import styles from "./Setting.module.css";
import { connect } from "react-redux";
import actions from "../../action/Actions";

const Setting = (props) => {
  const { defaultGridSize, defaultInterval } = props;
  const { changePage, changeGridSize, changeInterval } = props;

  const [gridSize, setGridSize] = useState(defaultGridSize);
  const [interval, setInterval] = useState(defaultInterval);

  const gridSizeChangeHandler = (event) => {
    setGridSize(event.target.value);
  };

  const intervalChangeHandler = (event) => {
    setInterval(event.target.value);
  };

  const buttonOnClickHandler = () => {
    changePage(1);
    changeGridSize(gridSize);
    changeInterval(interval);
  };

  return (
    <div className={styles["setting-wrapper"]}>
      <label className={styles.label}>Grid Size</label>
      <input
        className={styles.input}
        type="number"
        value={gridSize}
        onChange={gridSizeChangeHandler}
      />
      <label className={styles.label}>Generation Interval Time (ms)</label>
      <input
        className={styles.input}
        type="number"
        value={interval}
        onChange={intervalChangeHandler}
      />
      <button className={styles.button} onClick={buttonOnClickHandler}>
        Save & Play
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    defaultGridSize: state.gridSize,
    defaultInterval: state.interval,
  };
};

export default connect(mapStateToProps, actions)(Setting);

