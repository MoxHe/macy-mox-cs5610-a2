import initialState from './InitialState';

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'CHANGE_PAGE':
      return {
        ...state,
        pageId: payload.pageId,
      }
    case 'CHANGE_SIZE':
      return {
        ...state,
        gridSize: payload.gridSize,
      }
    case 'CHANGE_FREQUENCY':
      return {
        ...state,
        frequency: payload.frequency
      }
    default:
      return state;
  }
}

export default reducer;
