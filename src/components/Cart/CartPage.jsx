import Cart from "./cart";

const CartPage = ({ cartItems, onRemove, updatecart, itemsPrice, shippingPrice, totalPrice, taxPrice}) =>{
    console.log("Cart Items",cartItems);
    return (
        <div>
           <Cart showCart={true} updatecart={updatecart} onRemove={onRemove} shippingPrice={shippingPrice} cartItems={cartItems} itemsPrice={itemsPrice} totalPrice={totalPrice} taxPrice={taxPrice} />
        </div>
    )
}

export default CartPage;