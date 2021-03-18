import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import giphy from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
	const [cart, setCart] = useState([]);
	const [orderPlaced, setOrderPlaced] = useState(false);
	const history = useHistory()

	const handleProceedCheckout = () => {
		history.push('/shipment')
	}

	const handleRemove = (productKey) => {
		const newCart = cart.filter(pd => pd.key !== productKey);
		setCart(newCart);
		removeFromDatabaseCart(productKey);
	}

	useEffect(() => {
		const savedCart = getDatabaseCart();
		const productKeys = Object.keys(savedCart);
		const cartProducts = productKeys.map(key => {
			const product = fakeData.find(pd => pd.key === key);
			product.quantity = savedCart[key];
			return product;
			// console.log(product.quan);

		});
		setCart(cartProducts);
	}, [])

	let orderedImage;


	return (
		<div className='container'>
			<div className="product-container">
				{
					cart.map(pd => <ReviewItem
						handleRemove={handleRemove}
						key={pd.key}
						product={pd}
					></ReviewItem>)
				}
				{orderedImage}
			</div >
			<div className="cart-container">
				<Cart cart={cart}>
					<button
						onClick={handleProceedCheckout}
						className='main-button'>
						Proceed Checkout
					</button>
				</Cart>
			</div>
		</div>
	);
};

export default Review;