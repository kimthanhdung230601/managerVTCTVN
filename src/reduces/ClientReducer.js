const initialClient = {
  cartItem: [],
};
const ClientReducer = (state = initialClient, action) => {
  switch (action.type) {
    case "add_to_cart":
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
      };
    case "update_cart":
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
export default ClientReducer;
