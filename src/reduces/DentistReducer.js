
const initialClinic = {
  startDate: undefined,
  endDate: undefined,
  dayLength: 5,
  statusDisplay: "many",
};

const DentistReducer = (state = initialClinic, action) => {
  switch (action.type) {
    case "set_date_menu": //calendar hiển thị ngày bắt đầu và ngày két thúc
      return {
        ...state,
        startDate: action.payload.start,
        endDate: action.payload.end,
      };
    case "set_day_length":
      return {
        ...state,
        dayLength: action.payload,
      };
    case "status_display": //status hiển thị ngày trong calendar là một hay nhiều ngày
      return { ...state, statusDisplay: action.payload };
    case "set_start_date":
      return { ...state, startDate: action.payload };
    case "set_end_date":
      return { ...state, endDate: action.payload };
    default:
      return state;
  }
};

export default DentistReducer;
