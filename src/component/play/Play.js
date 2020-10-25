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

  startHandler = () => {
    this.setState({
      operation: operationState.START,
      isActive: true,
    })
  }

  pauseHandler = () => {
    this.setState({
      operation: operationState.PAUSE,
      isActive: false,
    })
  }

  resetHandler = () => {
    this.setState({
      operation: operationState.RESET,
      isActive: false,
    })
  }

  setCellNumberHandler = (liveCellNumber) => {
    this.setState({ liveCellNumber });
  }

  heatMapHandler = () => {
    this.setState({ isHeatmap: !this.state.isHeatmap });
  }

  render() {
    const { operation, isActive, liveCellNumber, isHeatmap } = this.state;

    return (
      <div className={styles.play}>
        <div>
          <button disabled={isActive} onClick={this.startHandler}>
            Start
          </button>
          <button disabled={!isActive} onClick={this.pauseHandler}>
            Pause
          </button>
          <button onClick={this.resetHandler}>Reset</button>
          <button onClick={this.heatMapHandler}>Toggle Heatmap</button>
        </div>
        <div>Current number of living cells: {liveCellNumber}</div>
        <Grid
          updateCellNumber={this.setCellNumberHandler}
          isActive={isActive}
          operation={operation}
          isHeatmap={isHeatmap}
        />
      </div>
    );
  }
}

export default Play;
