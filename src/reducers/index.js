const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderPrice: 0,
};
const bookRemuve = (id, state) => {
  const book = state.books.find(el => el.id === id);
  const cartElem = state.cartItems.find(el => el.id === book.id);
  if (cartElem.count === 0) {
    return {
      ...state,
      cartItems: [...state.cartItems.filter(el => el.id !== id)],
    };
  }

  return {
    ...state,
    cartItems: [
      ...state.cartItems.map(el =>
        el.id === id
          ? {
              ...el,
              count: el.count - 1,
              totalPrice: el.totalPrice - book.price,
            }
          : el
      ),
    ],
    orderPrice: state.orderPrice - book.price,
  };
};

const allBooksRemuve = (bookid, state) => {
  const cartElem = state.cartItems.find(el => el.id === bookid);
  return {
    ...state,
    cartItems: [...state.cartItems.filter(el => el.id !== bookid)],
    orderPrice: state.orderPrice - cartElem.totalPrice,
  };
};

const bookAdd = (bookId, state) => {
  const book = state.books.find(el => el.id === bookId);
  const cartElem = state.cartItems.find(el => el.id === book.id);

  if (state.cartItems && cartElem) {
    return {
      ...state,
      cartItems: [
        ...state.cartItems.map(el =>
          el.id === bookId
            ? {
                ...el,
                count: el.count + 1,
                totalPrice: el.totalPrice + book.price,
              }
            : el
        ),
      ],
      orderPrice: state.orderPrice + book.price,
    };
  }

  const newItem = {
    id: book.id,
    title: book.title,
    count: 1,
    totalPrice: book.price,
  };
  return {
    ...state,
    cartItems: [...state.cartItems, newItem],
    orderPrice: state.orderPrice + newItem.totalPrice,
  };
};

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null,
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload,
      };
    case 'BOOKS_ADD_TO_CART':
      return bookAdd(action.payload, state);

    case 'BOOK_REMUVE_FROM_CART':
      return bookRemuve(action.payload, state);

    case 'ALL_BOOKS_REMUVE_FROM_CART':
      return allBooksRemuve(action.payload, state);

    default:
      return state;
  }
};

export default reducer;
