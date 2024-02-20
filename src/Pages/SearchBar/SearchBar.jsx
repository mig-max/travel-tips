/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Search } from "semantic-ui-react";
import { Heading, } from "@chakra-ui/react";
import "./SearchBar.css";
import "@fontsource/poppins"

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

function SearchBar() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (event, data) => {
    setValue(data.value);

    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          search: data.value,
        },
      });
      const cityNames = response.data.map((city) => ({
        id: city.id, // Ensure id property is included
        title: city.city,
        description: city.description,
      }));

      const filteredResults = cityNames.filter((city) =>
        city.title.toLowerCase().includes(data.value.toLowerCase())
      );

      setResults(filteredResults);
      setLoading(false);
    } catch (error) {
      console.log("Error looking for destinations...", error);
      setLoading(false);
    }
  };

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
    <div className="search-bar-container">
  
    <div className="content">
  <Grid textAlign="center" verticalAlign="middle">
    <div className="search-bar-middle">
      <Heading
        className="search-bar"
        fontFamily="Poppins"
        fontSize="2xl"
        color="black"
      >Discover what's out there.
      </Heading>
        
        
      <Search
        className="search-results"
        fluid={true}
        size="huge"
        minCharacters={3}
        loading={loading}
        placeholder="Search for a city here..."
        onSearchChange={handleSearch}
        onResultSelect={handleResultSelect}
        results={results}
        value={value}
        noResultsMessage="No cities found"
        fontFamily="Poppins"
      />
    </div>
  </Grid>
</div>

  </div>


  );
}

export default SearchBar;