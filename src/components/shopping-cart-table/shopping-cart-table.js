import React from 'react';
import './shopping-cart-table.css';
import { connect } from 'react-redux';

import {
  bookRemuveFromToCart,
  allBooksRemuveFromToCart,
  booksAddToCart,
} from '../../actions';

const ShoppingCartTable = ({
  items,
  orderPrice,
  onIncrese,
  onDecrese,
  onDelete,
}) => {
  const renderRow = (el, idx) => {
    return (
      <tr key={el.id}>
        <td>{++idx}</td>
        <td>{el.title}</td>
        <td>{el.count}</td>
        <td>${el.totalPrice}</td>
        <td>
          <button
            onClick={() => onDelete(el.id)}
            className="btn btn-outline-danger btn-sm float-right"
          >
            <i className="fa fa-trash-o" />
          </button>
          <button
            onClick={() => onIncrese(el.id)}
            className="btn btn-outline-success btn-sm float-right"
          >
            <i className="fa fa-plus-circle" />
          </button>
          <button
            onClick={() => onDecrese(el.id)}
            className="btn btn-outline-warning btn-sm float-right"
          >
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{items.map(renderRow)}</tbody>
      </table>

      <div className="total">Total: {orderPrice}</div>
    </div>
  );
};

const mapStateToProps = ({ cartItems, orderPrice }) => {
  return {
    items: cartItems,
    orderPrice,
  };
};
const mapDispatchToProps = {
  onIncrese: booksAddToCart,

  onDecrese: bookRemuveFromToCart,

  onDelete: allBooksRemuveFromToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartTable);
