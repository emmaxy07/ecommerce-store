import { useEffect, useState } from "react";
import './WomensClothing.css';
import Navbar from "../../Navbar/navbar";
import loader from "../../../assets/Spinner-1s-200px.svg";


const WomensClothing = ({ updatecart, cartItems }) =>{
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchProducts() {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then(res => res.json())
      .then(productsData => {
        setProducts(productsData);
        setIsLoading(false);
      });
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  const btnStyle = {
    cursor: "pointer"
}
    return (
        <div>
          <Navbar noOfItemsIncart={cartItems.length} cartItems={cartItems} />
          <h2>Women's Clothing</h2>
          {isLoading ? <img src={loader} alt="" height="100px" width="100px" />
                        : products.map((product)=>{
                        return <div className="product" key={product.id}>
                        <img src={product.image} alt="product.name" />
                        <p><b>{product.title}</b></p>
                                <p>${product.price}</p>
                    <button style={btnStyle} onClick={()=>updatecart(product)}>Add to Cart</button>
                                </div>
            }) }
        </div>
    )
}

export default WomensClothing;