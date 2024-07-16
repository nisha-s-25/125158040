import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchProducts();
}, []);

const fetchProducts = async () => {
try {
const response = await axios.get('http://localhost:3001/products'); // Replace with your API endpoint
setProducts(response.data);
setLoading(false);
} catch (error) {
console.error('Error fetching products:', error);
}
};

if (loading) {
return <p>Loading...</p>;
}

return (
<div>
<h2>All Products</h2>
<div className="product-list">
{products.map(product => (
<div className="product-card" key={product.id}>
<Link to={`/product/${product.id}`}>
<img src={`https://via.placeholder.com/150`} alt={product.name} />
<h3>{product.name}</h3>
<p>Company: {product.company}</p>
<p>Category: {product.category}</p>
<p>Price: {product.price}</p>
<p>Rating: {product.rating}</p>
<p>Discount: {product.discount}</p>
<p>Availability: {product.availability ? 'Available' : 'Out of stock'}</p>
</Link>
</div>
))}
</div>
</div>
);
};

export default ProductList;