import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
	const first10 = fakeData.slice(0, 10);
	const [products, setProduct] = useState(first10);
	const [cart, setCart] = useState([]);


	const handleAddProduct = (product) => {
		const newCart = [...cart, product];
		setCart(newCart);
		console.log(cart);
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
				<h3>This is cart</h3>
				<h3>Order Summery: {cart.length}</h3>
			</div>
		</div>

	);
};

export default Shop;