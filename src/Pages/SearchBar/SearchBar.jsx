/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Grid, GridColumn, GridRow, Search } from 'semantic-ui-react'

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

function SearchBar(props) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');

  const handleSearch = async (event, data) => {
      setValue(data.value);

      try {
          setLoading(true);
          const response = await axios.get(`${API_URL}`, {
              params: {
                  search: data.value
              }
          });
          setResults(response.data);
          setLoading(false);
      } catch (error) {
          console.log("Error looking for destinations...", error);
          setLoading(false);
      }
  }

  return (
      <Grid>
          <GridRow width={12}>
              <Search
                  loading={loading}
                  placeholder='Search for a city for getting tips...' 
                  onSearchChange={handleSearch}
                  results={results}
                  value={value}
              />
          </GridRow>
      </Grid>
  );
}

export default SearchBar;