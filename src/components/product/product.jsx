import { useState } from 'react';
import './product.css';


function Product ({product, updatecart}) {
	const [isHovered, setIsHovered] = useState(false);
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
						<img src={product.image} alt={product.title} />
						<p className={isHovered ? 'multiline' : ''} title={product.title}>
        {isHovered ? product.title : truncateTitle(product.title)}
      </p>
						<p>${product.price}</p>
						<button style={btnStyle} onClick={()=>updatecart(product)}>Add to Cart</button>
		</div>
	)
}

export default Product;
