import { useEffect, useState } from "react";
import './WomensClothing.css';
import Navbar from "../../Navbar/navbar";

const WomensClothing = ({ updatecart, cartItems }) =>{
  const [products, setProducts] = useState([]);

  function fetchProducts() {
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then(res => res.json())
      .then(productsData => setProducts(productsData));
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
            {products.map((product)=>{
                return <div className="product" key={product.id}>
                <img src={product.image} alt="product.name" />
                <p><b>{product.title}</b></p>
                        <p>${product.price}</p>
						<button style={btnStyle} onClick={()=>updatecart(product)}>Add to Cart</button>
                        </div>
            })}
        </div>
    )
}

export default WomensClothing;