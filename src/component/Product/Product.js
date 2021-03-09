import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
	const { img, name, stock, seller, price, key } = props.product;
	// console.log(props.product);
	return (
		<div className="product">
			<div className="product-image">
				<img src={img} alt="" />
			</div>
			<div>
				<h4 className="product-name"><Link to={"/product/" + key}>{name}</Link></h4>
				<p><small>by:{seller}</small></p>
				<p>${price}</p>
				<p><small>Only {stock} left in the stock - Order now</small></p>
				{props.showAddCart && <button className="addBtn" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}

			</div>
		</div >
	);
};

export default Product;