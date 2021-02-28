import React from 'react';

const Cart = (props) => {
	const cart = props.cart;
	const total = cart.reduce((total, pd) => total + pd.price, 0);
	const tax = parseFloat(total * 10 / 100).toFixed(2);

	let shipping = 0;
	if (total > 150) {
		shipping = 3.99;
	}
	else if (total > 50) {
		shipping = 2.49;
	}
	else if (total > 0) {
		shipping = 1.99;
	}
	return (
		<div>
			<div>
				<h3>Order Summery</h3>
				<p>Items ordered: {cart.length}</p>
			</div>
			<div >
				<small>
					<p>Subtotal: $ {total.toFixed(2)}</p>
					<p>Shipping Cost: $ {shipping}</p>
					<p>Estimated Tax: $ {tax}</p>
				</small>
				<h4>Total Cost: $ {(total + shipping).toFixed(2)}</h4>


			</div>

		</div>
	);
};

export default Cart;