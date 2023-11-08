import { useDispatch, useSelector } from 'react-redux';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { updateCart, onRemove } from '../ShoppingCart/shoppingCartSlice';

const Cart = ({showCart}) =>{
  const navigate = useNavigate();

  function goToCheckout(){
    navigate("/checkout");
  }

  const dispatch = useDispatch();
  const {
    cartItems
  } = useSelector(store => store.shoppingCart);

    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    return (
        <div>
            {showCart && cartItems.map((item) => (
          <div key={item.id} className="cart-items">
            <img src={item.image} alt='' width="100px" height="100px" />
            <div className="col-2">{item.title}</div>
            <div className="col-2">
              <button onClick={() => dispatch (onRemove(item))} className="remove">
                -
              </button>{' '}
              <button onClick={() => dispatch (updateCart(item))} className="add">
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
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
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
              <button className='checkout' onClick={goToCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
        </div>
    )
}

export default Cart