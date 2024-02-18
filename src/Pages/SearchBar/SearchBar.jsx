import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { Grid, GridRow, Search } from 'semantic-ui-react';

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

function SearchBar() {

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const handleSearch = async (event, data) => {
    setValue(data.value);

    try {
        setLoading(true);
        const response = await axios.get(API_URL, {
            params: {
                search: data.value
            }
        });
        const cityNames = response.data.map(city => ({
            id: city.id, // Ensure id property is included
            title: city.city,
            description: city.description,
        }));

        const filteredResults = cityNames.filter(city => 
            city.title.toLowerCase().includes(data.value.toLowerCase())
        );

        setResults(filteredResults);
        setLoading(false);
    } catch (error) {
        console.log("Error looking for destinations...", error);
        setLoading(false);
    }

    
}

   // Set the value to the selected option title
   const handleResultSelect = (event, data) => {
    const selectedCity = data.result;
    setValue(selectedCity.title);
    setResults([]);

    // Ensure that selectedCity contains the necessary fields
    if (selectedCity && selectedCity.id) {
        // Extract the id from the selected city
        const selectedCityId = selectedCity.id;
        
        // Navigate to the details page using the extracted id
        navigate(`/destinations/${selectedCityId}`);
    } else {
        console.error("Selected city or its ID is undefined:", selectedCity);
    }
};



  
  return (
      <Grid>
          <GridRow width={60}>
              <Search 
                  loading={loading}
                  placeholder= "Search for a city here..." 
                  onSearchChange={handleSearch}
                  onResultSelect={handleResultSelect}
                  results={results}
                  value={value}
              />
          </GridRow>
      </Grid>
  );
}

export default SearchBar;
