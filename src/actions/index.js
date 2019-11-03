const booksLoaded = data => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: data,
  };
};
const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST',
  };
};
const booksError = err => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: err,
  };
};

const booksAddToCart = id => {
  return {
    type: 'BOOKS_ADD_TO_CART',
    payload: id,
  };
};
const bookRemuveFromToCart = id => {
  return {
    type: 'BOOK_REMUVE_FROM_CART',
    payload: id,
  };
};
const allBooksRemuveFromToCart = id => {
  return {
    type: 'ALL_BOOKS_REMUVE_FROM_CART',
    payload: id,
  };
};

const updateOrderPrice = () => {
  return {
    type: 'UPDATE_ORDER_PRICE',
  };
};

const fetchBooksold = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService
    .getBooks()
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
};

const fetchBooks = bookstoreService => () => dispatch => {
  dispatch(booksRequested());
  bookstoreService
    .getBooks()
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
};

export {
  fetchBooks,
  booksAddToCart,
  bookRemuveFromToCart,
  allBooksRemuveFromToCart,
  updateOrderPrice,
};
