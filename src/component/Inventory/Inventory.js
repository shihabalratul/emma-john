import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
	const setProduct = () => {
		fetch('https://radiant-oasis-99111.herokuapp.com/addProducts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(fakeData)
		})
			.then(res => res.json())
			.then(data => console.log(data))
	}
	return (
		<div>
			<button onClick={setProduct}>Add Product</button>
		</div>
	);
};

export default Inventory;