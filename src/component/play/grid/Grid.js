import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Cell from "./cell/Cell";
import { operationState, direction as dir } from "../../constant/Constant";

const Grid = (props) => {
  const { gridSize, isActive, operation, intervalTime } = props;
  const [cells, setCells] = useState(initCells(gridSize));

  const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  }

  useEffect(() => {
    let interval = null;
    if (operation === operationState.START && isActive) {
      interval = setInterval(nextGenerationHandler, intervalTime);
    } else if (operation === operationState.PAUSE && !isActive) {
      if (interval) {
        clearInterval(interval);
      }
    } else if (operation === operationState.RESET) {
      // TODO: reset grid
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, operation]);

  const nextGenerationHandler = () => {
    const nextCells = [...cells];

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells.length; j++) {

        let liveNeighbor = 0;
        for (let k = 0; k < dir.length; k++) {
          let row = i + dir[k][0];
          let col = j + dir[k][1];
          if (row < 0 || row >= cells.length || col < 0 || col >= cells.length) {
            continue;
          }
          if (cells[row][col] === 1) {
            liveNeighbor += 1;
          }
        }

        if (liveNeighbor < 2 || liveNeighbor > 3) {
          nextCells[i][j] = 0;
        }
        if (cells[i][j] === 0 && liveNeighbor === 3) {
          nextCells[i][j] = 1;
        }
      }
    }

    setCells(nextCells);
  };

  return (
    <div style={wrapperStyle}>
      {cells.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <Cell key={`${rowIdx},${colIdx}`} isLive={cell === 1} />
        ))
      )}
    </div>
  );
};

function initCells(gridSize) {
  const cells = [];
  for (let i = 0; i < gridSize; i += 1) {
    let row = [];
    for (let j = 0; j < gridSize; j += 1) {
      row.push(Math.random() < 0.5 ? 0 : 1);
    }
    cells.push(row);
  }

  return cells;
}

const mapStateToProps = (state) => {
  return {
    gridSize: state.gridSize,
    intervalTime: state.interval,
  };
};

export default connect(mapStateToProps, null)(Grid);
