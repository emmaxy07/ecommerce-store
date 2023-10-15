import Cart from "./cart";

const CartPage = ({ cartItems, onRemove, updatecart}) =>{
    return (
        <div>
           <Cart showCart={true} updatecart={updatecart} onRemove={onRemove} cartItems={cartItems} />
        </div>
    )
}

export default CartPage;