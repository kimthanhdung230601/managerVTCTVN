const initialState = {
  loadCount: 0,
};

const loadCountReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'INCREMENT_LOAD_COUNT':
      return {
        ...state,
        loadCount: state.loadCount + 1,
      };
    case 'RESET_LOAD_COUNT':
      return {
        ...state,
        loadCount: 0,
      };
    default:
      return state;
  }
};

export default loadCountReducer;