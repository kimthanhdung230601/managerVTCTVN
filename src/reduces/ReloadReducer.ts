const initial = {reloadCount: 0};
  const ReloadReducer = (state = initial, action:any) => {
    switch (action.type) {
      default:
        return {
            state: action.payload
        }
    }
  };
  export default ReloadReducer;
  