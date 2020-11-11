import React, { useState } from 'react';
import styles from './Setting.module.css';
import { connect } from 'react-redux';
import actions from '../../action/Actions';

const Setting = props => {
    const { defaultGridSize, defaultInterval } = props;
    const { changePage, changeGridSize, changeInterval } = props;

    const [gridSize, setGridSize] = useState(defaultGridSize);
    const [interval, setInterval] = useState(defaultInterval);

    const gridSizeChangeHandler = event => {
        setGridSize(event.target.value);
    };

    const intervalChangeHandler = event => {
        setInterval(event.target.value);
    };

    const buttonOnClickHandler = () => {
        changeGridSize(gridSize);
        changeInterval(interval);
        if (gridSize < 10 || gridSize > 100) {
            alert('The grid size range need to be between 10 to 100.');
            changeGridSize(10);
            changeInterval(200);
            return;
        }

        if (interval < 50 || gridSize > 2000) {
            alert(
                'The frequency of a generation need to be between 50 to 2000ms.'
            );
            changeGridSize(10);
            changeInterval(200);
            return;
        }
        changePage(1);
    };

    return (
        <div className={styles['setting-wrapper']}>
            <label className={styles.label}>Grid Size (10 - 100)</label>
            <input
                className={styles.input}
                type="number"
                value={gridSize}
                onChange={gridSizeChangeHandler}
            />
            <label className={styles.label}>
                Generation Interval Time (50 - 2000ms)
            </label>
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

const mapStateToProps = state => {
    return {
        defaultGridSize: state.gridSize,
        defaultInterval: state.interval,
    };
};

export default connect(mapStateToProps, actions)(Setting);
