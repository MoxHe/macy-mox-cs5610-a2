import React from 'react';
import { heatmap } from '../../../constant/Constant';
import { connect } from 'react-redux';

const Cell = props => {
    const { gradient, isHeatmap, isActive, gridSize } = props;

    let color;
    if (isHeatmap) {
        color =
            heatmap[gradient >= heatmap.length ? heatmap.length - 1 : gradient];
    } else {
        color = gradient === 0 ? 'white' : 'black';
    }

    const windowWidth = window.innerWidth;
    const size = (windowWidth * 0.35) / gridSize;

    const style = {
        backgroundColor: color,
        cursor: isActive ? 'auto' : 'pointer',
        width: `${size}px`,
        height: `${size}px`,
        border: '1px solid gray',
    };

    return <div onClick={props.clicked} style={style}></div>;
};

const mapStateToProps = state => {
    return {
        gridSize: state.gridSize,
    };
};

export default connect(mapStateToProps, null)(Cell);
