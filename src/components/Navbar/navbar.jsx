import './navbar.css';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showCategories } from '../ShoppingCart/shoppingCartSlice';
// import { useState } from 'react';
// import { setSearchResults } from '../ShoppingCart/shoppingCartSlice';


function Navbar ({ showCart, setShowCart, firstCharAfterSpace, userImage }) {
	// const [searchProduct, setSearchProduct] = useState("");
	// const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

	const dispatch = useDispatch();
	const {
		showCategoriesDropdown,
		noOfItemsIncart,
		// products
	} = useSelector(store => store.shoppingCart);

	const toggleCategoriesDropdown = () => {
		// setShowCategoriesDropdown(!showCategoriesDropdown);
		dispatch(showCategories());
	  };
	
	const toggleCartDisplay = () => setShowCart(!showCart)
	const style = {
		cursor: "pointer"
	}

	const categoriesList = [
		"Men's Clothing",
		"Women's Clothing",
		"Electronics",
		"Jewelry"
	  ];

	return (
		<nav className="navbar">
			<h3>Products</h3>
			<h3 
			className='categories' 
			onMouseEnter={toggleCategoriesDropdown}
        	onMouseLeave={toggleCategoriesDropdown}>
				Categories
					{showCategoriesDropdown && (
						<div className="categories-dropdown">
						  {categoriesList.map((category, index) => (
							<Link key={index} to={`/category/${category}`}>
							  <div><p>{category}</p></div>
							</Link>
						  ))}
						</div>
					  )}
			</h3>
			<div className="cart-container">
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16" onClick={toggleCartDisplay} className='svg' style={style}>
					<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
				</svg>
                <Link to="/cart">
				<p>{noOfItemsIncart}</p>
                </Link>
			</div>
			<div>
				<img src={userImage} alt='user' height="50px" />
		<span>{firstCharAfterSpace}</span>
      </div>
		</nav>
	)
}

export default Navbar;
