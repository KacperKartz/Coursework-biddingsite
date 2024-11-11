import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../assets/Search.svg';

const ListingSearch = ({ listings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Filter listings only when there is a search query
    if (searchQuery) {
      const filtered = listings.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredListings(filtered);
    } else {
      setFilteredListings([]); 
    }
  }, [searchQuery, listings]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const hideListings = (e) => {
    setSearchQuery("");
  }

  return (
    <div className="listing-search-container">
      {/* SearchBar itself */}
      <form className="search-form" role="search">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search listings..."
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">
          <img src={searchIcon} alt="search icon" className="search-icon" />
        </button>
      </form>



      {/* This is the filtered data showing */}
      {searchQuery && (
        <div className="listing-results-overlay">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div key={listing.id} className="listing-item">
                <Link to={`/product/${listing.id}`} className="listing-link">
                  <h3>{listing.title}</h3>
                  <p>{listing.description}</p>
                </Link>
              </div>
        ))
    ) : (
        <p className="no-listings">No listings found.</p>
    )}
    <button className='hide-button submit-button' onClick={hideListings}>Hide</button>
        </div>
      )}
      
    </div>
  );
};

export default ListingSearch;
