import { useEffect, useState } from 'react';
import './product-list.css';
import Product from '../product/product';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, clearSearchResults, sortItems } from '../ShoppingCart/shoppingCartSlice';
import { getProducts } from '../ShoppingCart/shoppingCartSlice';
import { Link } from 'react-router-dom';


function ProductList() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  const dispatch = useDispatch();
	const {
		products,
		searchResults,
		sortedItems,
    sortOrder,
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
  const renderProducts = isSearching ? searchResults : sortedItems.length > 0 ? sortedItems : products;

  const sortingItems = () => {
      dispatch(sortItems());
  }

  useEffect(()=>{
    
    dispatch(getProducts());
  
  },[dispatch]);
  

  return (
    <div>
		<input className='input' placeholder='Search for product' type='text' value={searchProduct} onChange={(e)=>searchProducts(e)} />
		<button className='sort-btn' onClick={sortingItems}>Sort $: {sortOrder === "asc" ? "Ascending" : "Descending"}</button>
		<div className="product-list">
      {renderProducts.map((product) => 
      <Link className='link' key={product.id} to={`/product/${product.id}`}>
        <Product product={product} />
        </Link>
      )}
	  </div>
    </div>
  );
}

export default ProductList;
