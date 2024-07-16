import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
const { id } = useParams();
const [product, setProduct] = useState({});
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchProduct();
}, [id]);

const fetchProduct = async () => {
try {
const response = await axios.get(`http://localhost:3001/product/${id}`); // Replace with your API endpoint
setProduct(response.data);
setLoading(false);
} catch (error) {
console.error('Error fetching product:', error);
}
};

if (loading) {
return <p>Loading...</p>;
}

return (
<div>
<h2>Product Detail</h2>
<div className="product-detail">
<img src={`https://via.placeholder.com/300`} alt={product.name} />
<h3>{product.name}</h3>
<p>Company: {product.company}</p>
<p>Category: {product.category}</p>
<p>Price: {product.price}</p>
<p>Rating: {product.rating}</p>
<p>Discount: {product.discount}</p>
<p>Availability: {product.availability ? 'Available' : 'Out of stock'}</p>
</div>
</div>
);
};

export default ProductDetail;