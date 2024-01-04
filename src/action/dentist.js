//trạng thái hiển thị số ngày trong calendar là một ngày hay hiều ngày
export const setStatusDisplay = (item) => {
    return {
      type: "status_display",
      payload: item,
    };
  };
  export const setDayLength = (item) => {
    return {
      type: "set_day_length",
      payload: item,
    };
  };
  export const setStartDate = (item) => {
    return {
      type: "set_start_date",
      payload: item,
    };
  };
  export const setEndDate = (item) => {
    return {
      type: "set_end_date",
      payload: item,
    };
  };
  