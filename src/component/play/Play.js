import React from "react";
import Grid from "./grid/Grid";
import styles from "./Play.module.css";
import { operationState } from "../constant/Constant";

class Play extends React.Component {
  state = {
    operation: null,
    isActive: false,
    liveCellNumber: 0,
    isHeatmap: false,
  };

  setDefaultOperationHandler = () => {
    this.setState({ operation: null });
  };

  startHandler = () => {
    this.setState({
      operation: operationState.START,
      isActive: true,
    });
  };

  pauseHandler = () => {
    this.setState({
      operation: operationState.PAUSE,
      isActive: false,
    });
  };

  resetHandler = () => {
    this.setState({
      operation: operationState.RESET,
      isActive: false,
    });
  };

  setCellNumberHandler = (liveCellNumber) => {
    this.setState({ liveCellNumber });
  };

  heatMapHandler = () => {
    this.setState({ isHeatmap: !this.state.isHeatmap });
  };

  render() {
    const { operation, isActive, liveCellNumber, isHeatmap } = this.state;

    return (
      <div className={styles.play}>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            disabled={isActive}
            onClick={this.startHandler}
          >
            Start
          </button>
          <button
            className={styles.button}
            disabled={!isActive}
            onClick={this.pauseHandler}
          >
            Pause
          </button>
          <button
            className={styles.button}
            disabled={isActive}
            onClick={this.resetHandler}
          >
            Reset
          </button>
          <button className={styles.button} onClick={this.heatMapHandler}>
            Toggle Heatmap
          </button>
        </div>
        <div className={styles.text}>
          Current number of living cells:
          <span className={styles.number}>{liveCellNumber}</span>
        </div>

        <Grid
          updateCellNumber={this.setCellNumberHandler}
          isActive={isActive}
          operation={operation}
          isHeatmap={isHeatmap}
          setDefaultOperationHandler={this.setDefaultOperationHandler}
        />
      </div>
    );
  }
}

export default Play;
