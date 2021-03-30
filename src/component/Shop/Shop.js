import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
	const [products, setProduct] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		fetch('https://radiant-oasis-99111.herokuapp.com/products')
			.then(res => res.json())
			.then(data => {
				setProduct(data)
			})
	}, [])

	useEffect(() => {
		const savedCart = getDatabaseCart();
		const productKeys = Object.keys(savedCart);
		fetch('https://radiant-oasis-99111.herokuapp.com/productsByKeys', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(productKeys)
		})
			.then(res => res.json())
			.then(data => {
				setCart(data)
			})
	}, [])

	const handleAddProduct = (product) => {
		const toBeAddedKey = product.key;
		const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
		let count = 1;
		let newCart;
		if (sameProduct) {
			count = sameProduct.quantity + 1;
			sameProduct.quantity = count;
			const others = cart.filter(pd => pd.key !== toBeAddedKey);
			newCart = [...others, sameProduct];

		}
		else {
			product.quantity = 1;
			newCart = [...cart, product];
		}
		// const count = sameProduct.length;
		// const newCart = [...cart, product];
		setCart(newCart);

		addToDatabaseCart(product.key, count);
		// console.log(cart);
	}

	return (
		<div className="container">
			<div className="product-container">
				{
					products.map(pd =>
						<Product
							key={pd.key}
							showAddCart={true}
							product={pd}
							handleAddProduct={handleAddProduct}
						></Product>)
				}
			</div>

			<div className="cart-container">
				<Cart cart={cart}>
					<Link to='/review'><button>Review Order</button></Link>
				</Cart>
			</div>
		</div>

	);
};

export default Shop;