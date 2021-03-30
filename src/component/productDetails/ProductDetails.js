import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
	const { productKey } = useParams();
	const [product, setProduct] = useState({})

	useEffect(() => {
		fetch(`https://radiant-oasis-99111.herokuapp.com/product/${productKey}`)
			.then(res => res.json())
			.then(data => {
				setProduct(data)
			})
	}, [productKey])
	// const product = products?.find(pd => pd.key === productKey);
	return (
		<div>
			<h1>Product details.</h1>
			<Product showAddCart={false} product={product}></Product>
		</div>
	);
};

export default ProductDetails;