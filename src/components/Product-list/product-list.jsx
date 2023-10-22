import { useState } from 'react';
import './product-list.css';
import Product from '../product/product';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, clearSearchResults } from '../ShoppingCart/shoppingCartSlice';

function ProductList() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  const dispatch = useDispatch();
	const {
		products,
		searchResults
	} = useSelector(store => store.shoppingCart);

  const searchProducts = (e) => {
	const searchedProduct = e.target.value.toLowerCase();
	if (searchedProduct === "") {
		dispatch(clearSearchResults());
	} else {
	const filteredProduct = [...products].filter((product) => {
		return product.title.toLowerCase().includes(searchedProduct);
	})
	dispatch (setSearchResults(filteredProduct));
 }
 setSearchProduct(e.target.value);
 setIsSearching(searchedProduct !== "");
}
  // Choose the array to map over based on whether a search is in progress.
  const productsToDisplay = isSearching ? searchResults : products;

  return (
    <div >
		<input className='input' placeholder='Search for product' type='text' value={searchProduct} onChange={(e)=>searchProducts(e)} />
		<div className="product-list">
      {productsToDisplay.map((product) => 
        <Product key={product.id} product={product} />
      )}
	  </div>
    </div>
  );
}

export default ProductList;
