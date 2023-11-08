import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { updateCart, onRemove, updatePrices } from '../ShoppingCart/shoppingCartSlice';

const Cart = ({ showCart }) => {
  const navigate = useNavigate();

  function goToCheckout() {
    navigate("/checkout");
  }

  const dispatch = useDispatch();
  const {
    cartItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = useSelector((store) => store.shoppingCart);

  const handleAddToCart = (item) => {
    dispatch(updateCart(item)); // Dispatch the updateCart action
    dispatch(updatePrices()); // Dispatch the updatePrices action
  };

  const handleRemoveFromCart = (item) => {
    dispatch(onRemove(item)); // Dispatch the onRemove action
    dispatch(updatePrices()); // Dispatch the updatePrices action
  };

  useEffect(() => {
    dispatch(updatePrices());
  }, [dispatch]);

  return (
    <div>
      {showCart &&
        cartItems.map((item) => (
          <div key={item.id} className="cart-items">
            <img src={item.image} alt="" width="100px" height="100px" />
            <div className="col-2">{item.title}</div>
            <div className="col-2">
              <button onClick={() => handleRemoveFromCart(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => handleAddToCart(item)} className="add">
                +
              </button>
            </div>
            <div className="col-2 text-right">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
            <hr />
          </div>
        ))}
      {showCart && cartItems.length !== 0 && (
        <>
          {/* ... */}
          <div className="row">
            <div className="col-2"><strong>Items Price</strong></div>
            <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
          </div>
          <br />
          <div className="row">
            <div className="col-2"><strong>Tax Price</strong></div>
            <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
          </div>
          <br />
          <div className="row">
            <div className="col-2">Shipping Price</div>
            <div className="col-1 text-right">${shippingPrice.toFixed(2)}</div>
            <br />
          </div>

          <div className="row">
            <div className="col-2">
              <strong>Total Price</strong>
            </div>
            <div className="col-1 text-right">
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
          </div>
          <hr />
          <div className="row">
            <button className="checkout" onClick={goToCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
