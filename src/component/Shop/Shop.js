import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';

const Shop = () => {
	const first10 = fakeData.slice(0, 10);
	const [products, setProduct] = useState(first10);
	const [cart, setCart] = useState([]);


	const handleAddProduct = (product) => {
		const newCart = [...cart, product];
		setCart(newCart);
		// console.log(cart);
	}

	return (
		<div className="container">
			<div className="product-container">
				{
					products.map(pd =>
						<Product
							product={pd}
							handleAddProduct={handleAddProduct}
						></Product>)
				}
			</div>

			<div className="cart-container">
				<Cart cart={cart}></Cart>
			</div>
		</div>

	);
};

export default Shop;