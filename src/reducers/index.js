import updateBookList from './update-booklist';
import updateShoppingCart from './update-shoping-cart';

const reducer = (state, action) => {
  console.log(action.type);
  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action),
  };
};

export default reducer;
