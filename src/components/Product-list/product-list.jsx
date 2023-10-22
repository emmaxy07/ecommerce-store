import Product from '../product/product';
import './product-list.css';


function ProductList ({products, viewCart}) {
	return (
		<div className="product-list">
			
			{
				products.map(product =>
					<Product key={product.id} product={product}/>
				)
			}

			<p>{viewCart().length}</p>
		</div>
	)
}

export default ProductList;
