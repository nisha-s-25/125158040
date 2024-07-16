import React from 'react';

const Filter = ({ categories, companies, onFilterChange }) => {
return (
<div>
<h3>Filters</h3>
<label>Category:
<select onChange={e => onFilterChange('category', e.target.value)}>
<option value="">All</option>
{categories.map(category => (
<option key={category} value={category}>{category}</option>
))}
</select>
</label>
<label>Company:
<select onChange={e => onFilterChange('company', e.target.value)}>
<option value="">All</option>
{companies.map(company => (
<option key={company} value={company}>{company}</option>
))}
</select>
</label>
{/* Add more filters as needed */}
</div>
);
};

export default Filter;