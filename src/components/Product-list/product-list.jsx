import { useState } from 'react';
import './product-list.css';
import Product from '../product/product';

function ProductList({ products, viewCart }) {
  const [isSearching, setIsSearching] = useState(false);

  // Choose the array to map over based on whether a search is in progress.
  const productsToDisplay = isSearching ? viewCart() : products;

  return (
    <div className="product-list">
      {productsToDisplay.map((product) => 
        <Product key={product.id} product={product} />
      )}
      <p>{productsToDisplay.length}</p>
    </div>
  );
}

export default ProductList;
