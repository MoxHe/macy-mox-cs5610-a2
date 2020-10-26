import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Cell from "./cell/Cell";
import { operationState, direction as dir } from "../../constant/Constant";

const Grid = (props) => {
  const {
    gridSize,
    isActive,
    operation,
    intervalTime,
    updateCellNumber,
    isHeatmap,
    setDefaultOperationHandler,
  } = props;
  const [grid, setGrid] = useState(initGrid());

  const nextGenerationHandler = () => {
    const newGrid = [...grid];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        let liveNeighbor = 0;
        for (let k = 0; k < dir.length; k++) {
          let row = i + dir[k][0];
          let col = j + dir[k][1];
          if (row < 0 || row >= grid.length || col < 0 || col >= grid.length) {
            continue;
          }
          if (grid[row][col] === 0) {
            liveNeighbor += 1;
          }
        }

        if (grid[i][j] === 0 && (liveNeighbor < 2 || liveNeighbor > 3)) {
          newGrid[i][j] = 1;
        } else if (grid[i][j] > 0 && liveNeighbor === 3) {
          newGrid[i][j] = 0;
        } else if (grid[i][j] > 0) {
          newGrid[i][j] = grid[i][j] + 1;
        }
      }
    }
    setGrid(newGrid);
  };

  const onClickHandler = (rowIdx, colIdx) => {
    if (!isActive) {
      const newGrid = [...grid];
      newGrid[rowIdx][colIdx] = grid[rowIdx][colIdx] === 0 ? 1 : 0;
      setGrid(newGrid);
    }
  };

  function initGrid() {
    const cells = [];
    for (let i = 0; i < gridSize; i += 1) {
      let row = [];
      for (let j = 0; j < gridSize; j += 1) {
        const cell = Math.random() < 0.5 ? 0 : 1;
        row.push(cell);
      }
      cells.push(row);
    }

    return cells;
  }

  useEffect(() => {
    let interval = null;
    if (operation === operationState.START) {
      interval = setInterval(nextGenerationHandler, intervalTime);
    } else if (operation === operationState.PAUSE) {
      if (interval) {
        clearInterval(interval);
      }
    } else if (operation === operationState.RESET) {
      setGrid(initGrid());
      if (interval) {
        clearInterval(interval);
      }
      setDefaultOperationHandler();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [operation]);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid.length; j += 1) {
        if (grid[i][j] === 0) {
          count++;
        }
      }
    }
    updateCellNumber(count);
  }, [grid]);

  const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <div style={wrapperStyle}>
      {grid.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <Cell
            clicked={onClickHandler.bind(this, rowIdx, colIdx)}
            key={`${rowIdx},${colIdx}`}
            isHeatmap={isHeatmap}
            gradient={cell}
          />
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gridSize: state.gridSize,
    intervalTime: state.interval,
  };
};

export default connect(mapStateToProps, null)(Grid);
