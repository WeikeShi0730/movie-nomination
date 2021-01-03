import React from "react";

import "./search-bar.styles.scss";

export const SearchBar = (props) => (
  <input
    className="search-bar"
    type="text"
    placeholder="search movies"
    onChange={props.onSearchChange}
  />
);
