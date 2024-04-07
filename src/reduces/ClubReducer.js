const initialClinic = {
  clubInfor: {
    club: "",
    NameClb: "",
  },
};

const ClubReducer = (state = initialClinic, action) => {
  switch (action.type) {
    case "status_infor":
      return {
        ...state,
        clubInfor: {
          club: action.payload.club,
          NameClb: action.payload.NameClb,
        },
      };

    default:
      return state;
  }
};

export default ClubReducer;
