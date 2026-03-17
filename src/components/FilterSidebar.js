import { memo } from 'react';

function FilterSidebar({
  filters,
  categories,
  onCategoryChange,
  onPriceChange,
  onSearchChange,
  onClear,
}) {
  return (
    <aside className="panel">
      <h2>Filters</h2>

      <div className="field">
        <label htmlFor="search">Search product</label>
        <input
          id="search"
          type="text"
          placeholder="Type a product name"
          value={filters.search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Price range</label>
        <div className="price-row">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(event) => onPriceChange(Number(event.target.value), filters.maxPrice)}
          />
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(event) => onPriceChange(filters.minPrice, Number(event.target.value))}
          />
        </div>
      </div>

      <button className="btn btn-secondary" onClick={onClear}>
        Reset filters
      </button>
    </aside>
  );
}

export default memo(FilterSidebar);
