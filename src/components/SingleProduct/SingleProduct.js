import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";


function SingleProduct({}) {
    const {id} = useParams();
    const {products} = useSelector(store => store.shoppingCart);

    const product = products.find((el) => el.id === +id);

    if(!product) return <div>Product Not Found</div>
    return (
        <div>
            <img src={product.image} alt={product.title} />
            <p className="product-title">{product.title}</p>
        </div>
    )
}

export default SingleProduct
