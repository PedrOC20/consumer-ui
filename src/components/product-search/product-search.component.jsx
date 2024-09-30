import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Pagination, ProductSearchContainer, Search,  Table } from './product-search.styles';
import Button from '../button/button.component';

const ProductSearch = () => {
  const [filterType, setFilterType] = useState('country'); // Select box value (country/product_name)
  const [filterValue, setFilterValue] = useState('');      // Text input value
  const [products, setProducts] = useState([]);            // Fetched products
  const [currentPage, setCurrentPage] = useState(1);       // Current page state
  const [totalPages, setTotalPages] = useState(1);         // Total pages state

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  const fetchFilteredProducts = useCallback(async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:3001/products`, {
        params: {
          [filterType]: filterValue,  // Dynamically pass country or product_name based on filterType
          page: page
        }
      });
      setProducts(response.data.products);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [filterType, filterValue]);

  // Call the API whenever the page or filter changes
  useEffect(() => {
    fetchFilteredProducts(currentPage);
  }, [currentPage,fetchFilteredProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchFilteredProducts(page);
  };

  // Create pagination with ellipses
  const renderPageNumbers = () => {
    const pages = [];

    // Pages at the start
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    // Ellipsis before current page range
    if (currentPage > 5) {
      pages.push(<span key="start-ellipsis">...</span>);
    }

    // Pages around the current page
    const startPage = Math.max(4, currentPage - 2);
    const endPage = Math.min(totalPages - 3, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    // Ellipsis after current page range
    if (currentPage < totalPages - 4) {
      pages.push(<span key="end-ellipsis">...</span>);
    }

    // Pages at the end
    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <ProductSearchContainer>
      <Search>
        {/* Select box for filter type (country or product_name) */}
        <select value={filterType} onChange={handleFilterChange}>
          <option value="country">Country</option>
          <option value="product_name">Product Name</option>
        </select>

        {/* Text input for filter value */}
        <input 
          type="text" 
          value={filterValue} 
          onChange={handleInputChange} 
          placeholder={`Enter ${filterType}`} 
        />

        {/* Button to trigger the product search */}
        <Button onClick={() => fetchFilteredProducts(1)}>Search Products</Button>
      </Search>

      <Table>
        {/* Render fetched products */}
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Product Category Id</th>
                <th>Brand</th>
                <th>Shop Name</th>
                <th>Country</th>
                <th>Price</th>
                <th>Url</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_category_id}</td>
                  <td>{product.brand}</td>
                  <td>{product.shop_name}</td>
                  <td>{product.country}</td>
                  <td>€{product.price}</td>
                  <td>{product.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
      </Table>

       {/* Pagination controls */}
       <Pagination>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </Pagination>
    </ProductSearchContainer>
  );
};

export default ProductSearch;
