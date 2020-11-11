import actoinType from './ActionType';

export const changePage = pageId => ({
    type: actoinType.CHANGE_PAGE,
    payload: {
        pageId,
    },
});

export const changeGridSize = gridSize => ({
    type: actoinType.CHANGE_SIZE,
    payload: {
        gridSize,
    },
});

export const changeInterval = interval => ({
    type: actoinType.CHANGE_INTERVAL,
    payload: {
        interval,
    },
});

export default {
    changeInterval,
    changeGridSize,
    changePage,
};
