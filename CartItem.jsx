import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateQuantity,
  removeItem,
} from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce((total, item) => {
    const unitCost = item.cost ?? item.price ?? 0;
    return total + unitCost * item.quantity;
  }, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert("Coming Soon");
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">
            🛒 Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
          </Link>
        </div>
      </nav>

      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div>
            <h2>Your cart is empty</h2>
            <Link to="/plants" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => {
              const unitCost = item.cost ?? item.price ?? 0;
              return (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-details">
                    <h2>{item.name}</h2>
                    <p>Unit Price: ${unitCost.toFixed(2)}</p>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <p>
                      Total: ${(unitCost * item.quantity).toFixed(2)}
                    </p>

                    <button
                      type="button"
                      className="cart-item-delete"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="cart-summary">
              <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
              <button type="button" onClick={handleCheckout}>
                Checkout
              </button>
              <Link to="/plants" className="continue-shopping-button">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
