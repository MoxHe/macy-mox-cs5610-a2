import React from "react";
import Grid from "./grid/Grid";
import styles from "./Play.module.css";
import { operationState } from "../constant/Constant";

class Play extends React.Component {
  state = {
    operation: null,
    isActive: false,
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

  render() {
    const { operation, isActive } = this.state;

    return (
      <div className={styles.play}>
        <div>
          <button disabled={isActive} onClick={this.startHandler}>Start</button>
          <button disabled={!isActive} onClick={this.pauseHandler}>Pause</button>
          <button onClick={this.resetHandler}>Reset</button>
        </div>
        <Grid isActive={isActive} operation={operation}/>
      </div>
    );
  }
}

export default Play;
