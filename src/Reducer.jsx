export const initialState = {
  basket: [],
  user: undefined,
  searchTerm: "",
};

function reducer(state, action) {
  console.log(...state.basket);

  switch (action.type) {
    case 'ADD_TO_BASKET':
      // Check if item already exists
      const existingIndex = state.basket.findIndex(
        item => item.id === action.item.id
      );

      if (existingIndex >= 0) {
        const updatedBasket = [...state.basket];
        updatedBasket[existingIndex].quantity += 1;
        
        return {
          ...state,
          basket: updatedBasket,
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, quantity: 1 }],
        };
      }

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        basket: state.basket.map(item =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0),
      };

    case 'REMOVE_FROM_BASKET':
      return {
        ...state,
        basket: state.basket.filter(item => item.id !== action.id),
      };

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.term,
      };

    default:
      return state;
  }
}

export default reducer;
