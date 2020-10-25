import React, { useEffect, useState, useCallback } from "react";
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
  } = props;
  const [grid, setGrid] = useState(initGrid());

  const nextGenerationHandler = useCallback(() => {
    const { cells, cellNumber } = grid;
    const newCells = [...cells];
    let newCellNumber = cellNumber;

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells.length; j++) {
        let liveNeighbor = 0;
        for (let k = 0; k < dir.length; k++) {
          let row = i + dir[k][0];
          let col = j + dir[k][1];
          if (
            row < 0 ||
            row >= cells.length ||
            col < 0 ||
            col >= cells.length
          ) {
            continue;
          }
          if (cells[row][col] === 0) {
            liveNeighbor += 1;
          }
        }

        if (cells[i][j] === 0 && (liveNeighbor < 2 || liveNeighbor > 3)) {
          newCellNumber -= 1;
          newCells[i][j] = 1;
        } else if (cells[i][j] > 0 && liveNeighbor === 3) {
          newCellNumber += 1;
          newCells[i][j] = 0;
        } else if (cells[i][j] > 0) {
          newCells[i][j] = cells[i][j] + 1;
        }
      }
    }
    setGrid({ cells: newCells, cellNumber: newCellNumber });
  }, [grid]);

  const onClickHandler = (rowIdx, colIdx) => {
    if (!isActive) {
      const { cells, cellNumber } = grid;
      const newCells = [...cells];
      newCells[rowIdx][colIdx] = cells[rowIdx][colIdx] === 0 ? 1 : 0;
      const newCellNumber = cellNumber + (cells[rowIdx][colIdx] === 0 ? 1 : -1);
      setGrid({ cells: newCells, cellNumber: newCellNumber });
    }
  };

  function initGrid() {
    const cells = [];
    let cellNumber = 0;
    for (let i = 0; i < gridSize; i += 1) {
      let row = [];
      for (let j = 0; j < gridSize; j += 1) {
        const cell = Math.random() < 0.5 ? 0 : 1;
        cellNumber += 1 - cell;
        row.push(cell);
      }
      cells.push(row);
    }

    return { cells, cellNumber };
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
  }, [isActive, operation, nextGenerationHandler, intervalTime]);

  useEffect(() => {
    updateCellNumber(grid.cellNumber);
  }, [grid, updateCellNumber]);

  const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <div style={wrapperStyle}>
      {grid.cells.map((row, rowIdx) =>
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
