const updateShoppingCart = (state, action) => {
  if (state === undefined) {
    return {
      cartItems: [],
      orderPrice: 0,
    };
  }
  switch (action.type) {
    case 'BOOKS_ADD_TO_CART':
      return bookAdd(action.payload, state);

    case 'BOOK_REMUVE_FROM_CART':
      return bookRemuve(action.payload, state);

    case 'ALL_BOOKS_REMUVE_FROM_CART':
      return allBooksRemuve(action.payload, state);

    default:
      return state.shoppingCart;
  }
};

const bookRemuve = (id, state) => {
  const { cartItems, orderPrice } = state.shoppingCart;
  const book = state.bookList.books.find(el => el.id === id);
  const cartElem = cartItems.find(el => el.id === book.id);

  if (cartElem.count === 0) {
    return {
      cartItems: [...cartItems.filter(el => el.id !== id)],
    };
  }

  return {
    cartItems: [
      ...cartItems.map(el =>
        el.id === id
          ? {
              ...el,
              count: el.count - 1,
              totalPrice: el.totalPrice - book.price,
            }
          : el
      ),
    ],
    orderPrice: orderPrice - book.price,
  };
};

const allBooksRemuve = (bookid, state) => {
  const { cartItems, orderPrice } = state.shoppingCart;
  const cartElem = cartItems.find(el => el.id === bookid);

  return {
    cartItems: [...cartItems.filter(el => el.id !== bookid)],
    orderPrice: orderPrice - cartElem.totalPrice,
  };
};

const bookAdd = (bookId, state) => {
  const { cartItems, orderPrice } = state.shoppingCart;
  const book = state.bookList.books.find(el => el.id === bookId);
  const cartElem = cartItems.find(el => el.id === book.id);

  if (cartItems && cartElem) {
    return {
      cartItems: [
        ...cartItems.map(el =>
          el.id === bookId
            ? {
                ...el,
                count: el.count + 1,
                totalPrice: el.totalPrice + book.price,
              }
            : el
        ),
      ],
      orderPrice: orderPrice + book.price,
    };
  }

  const newItem = {
    id: book.id,
    title: book.title,
    count: 1,
    totalPrice: book.price,
  };
  console.log(newItem);
  return {
    cartItems: [...cartItems, newItem],
    orderPrice: orderPrice + newItem.totalPrice,
  };
};

export default updateShoppingCart;
