const initialClinic = {
  club: undefined,
  NameClb: undefined,
};

const DentistReducer = (state = initialClinic, action) => {
  switch (action.type) {
    case "status_infor":
      return {
        ...state,
        NameClb: action.payload.NameClb,
        club: action.payload.club,
      };

    default:
      return state;
  }
};

export default DentistReducer;
