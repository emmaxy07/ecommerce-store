import { useState } from 'react';
import './product.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../ShoppingCart/shoppingCartSlice';



function Product ({product}) {
	const [isHovered, setIsHovered] = useState(false);

	const dispatch = useDispatch();
  const {
	products,
    searchResults
  } = useSelector(store => store.shoppingCart);
	const btnStyle = {
		cursor: "pointer"
	}

	const truncateTitle = (title) => {
		const maxLength = 20;
		if (title.length > maxLength) {
		  return title.slice(0, maxLength) + '...';
		}
		return title;
	  };

	return (
		<div className={`product ${isHovered ? 'hovered' : ''}`}
		onMouseEnter={() => setIsHovered(true)}
		onMouseLeave={() => setIsHovered(false)}>
						{searchResults.map((product) => {
						return <><img src={product.image} alt={product.title} />
						<p className={isHovered ? 'multiline' : ''} title={product.title}>
        {isHovered ? product.title : truncateTitle(product.title)}
      </p>
						<p>${product.price}</p>
						<button style={btnStyle} onClick={()=>dispatch (updateCart(product))}>Add to Cart</button>
						</>})}
		</div>
	)
}

export default Product;
