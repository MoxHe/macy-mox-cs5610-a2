import initialState from './InitialState';
import actionType from '../action/ActionType';

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.CHANGE_PAGE:
            return {
                ...state,
                pageId: payload.pageId,
            };
        case actionType.CHANGE_SIZE:
            return {
                ...state,
                gridSize: payload.gridSize,
            };
        case actionType.CHANGE_INTERVAL:
            return {
                ...state,
                interval: payload.interval,
            };
        default:
            return state;
    }
};

export default reducer;
