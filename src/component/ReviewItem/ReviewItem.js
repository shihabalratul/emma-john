import React from 'react';

const ReviewItem = (props) => {
	const { name, quantity, key, price } = props.product;
	const reviewItemStyle = {
		borderBottom: "1px solid lightGray",
		marginBottom: "5px",
		paddingBottom: "5px",
		marginLeft: "200px"
	};
	return (
		<div style={reviewItemStyle} className='reviewItem'>
			<h3>{name}</h3>
			<p>Quantity:{quantity}</p>
			<p>Price:${price}</p>
			<button
				onClick={() => props.handleRemove(key)}
				className="main-button"
			>Remove</button>
		</div>
	);
};

export default ReviewItem;