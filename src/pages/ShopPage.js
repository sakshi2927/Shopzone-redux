import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { addToCart, removeFromCart, selectCartItems } from '../features/cart/cartSlice';
import {
  clearFilters,
  selectFilters,
  setCategory,
  setPriceRange,
  setSearch,
} from '../features/filters/filterSlice';

function ShopPage() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const cartItems = useSelector(selectCartItems);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('https://dummyjson.com/products?limit=100', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data = await response.json();
        setProducts(data.products ?? []);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong while fetching products.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const byCategory =
        filters.category === 'All' || product.category.toLowerCase() === filters.category.toLowerCase();
      const byPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const bySearch = product.title.toLowerCase().includes(filters.search.toLowerCase());

      return byCategory && byPrice && bySearch;
    });
  }, [filters.category, filters.maxPrice, filters.minPrice, filters.search, products]);

  const cartItemIds = useMemo(() => {
    return new Set(cartItems.map((item) => item.id));
  }, [cartItems]);

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (productId) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch]
  );

  const handleCategoryChange = useCallback(
    (category) => {
      dispatch(setCategory(category));
    },
    [dispatch]
  );

  const handlePriceChange = useCallback(
    (minPrice, maxPrice) => {
      dispatch(setPriceRange({ minPrice, maxPrice }));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (search) => {
      dispatch(setSearch(search));
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  if (loading) {
    return <section className="panel page-card">Loading products...</section>;
  }

  if (error) {
    return <section className="panel page-card error-text">{error}</section>;
  }

  return (
    <section className="shop-layout">
      <FilterSidebar
        filters={filters}
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
        onSearchChange={handleSearchChange}
        onClear={handleClearFilters}
      />

      <ProductGrid
        products={filteredProducts}
        cartItemIds={cartItemIds}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </section>
  );
}

export default ShopPage;
