import { useParams } from "react-router-dom";
import "./SingleProduct.css";
import Navbar from "../Navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../ShoppingCart/shoppingCartSlice";




function SingleProduct() {
    const dispatch = useDispatch();
  const {
    cartItems,
    products, 
  } = useSelector(store => store.shoppingCart);
    const {id} = useParams();

    const product = products.find((el) => el.id === +id);

    if(!product) return <div>Product Not Found</div>
    return (
        <div>
        <Navbar noOfItemsIncart={cartItems.length} cartItems={cartItems} />
        <div className="single-product">
            <div>
            <img src={product.image} alt={product.title} />
            <p className="product-title">{product.title}</p>
            </div>
            <div className="cart-btn-div">
                <button className="cart-btn" onClick={()=> dispatch (updateCart(product))}>Add To Cart</button>
            </div>
        </div>
        </div>
    )
}

export default SingleProduct
