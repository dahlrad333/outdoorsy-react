import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Results from '../results';
import { API_URL } from '../../consts';

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [included, setIncluded] = useState([])
  const [dataFetcher, setDataFetcher] = useState(true)

  useEffect(() => {
    // Wait for 1 second after the last change before making the API request
    setTimeout(() => {
      if(dataFetcher){
        fetchData()
      }
    }, 1000);
  }, [dataFetcher]);

  const fetchData = async () => {
    try {
      const url = API_URL + `?limit=10&offset=3`
      console.log('requesturl??? ', url)
      const response = await axios.get(url);
      // console.log('dataFetcher ', dataFetcher)
      console.log('response.data??? ', response.data )
      setDataFetcher(false)
      setSearchResults(response.data.data);
      setIncluded(response.data.included);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    setDataFetcher(true)
  };


  return (
    <div className="flex flex-col h-screen justify-start items-center w-screen mt-4">
      <input
        type="text"
        className="p-2 border border-grey rounded w-[50%]"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="overflow-y-auto mt-4">
        <Results results={searchResults} included={included}></Results>
      </div>
    </div>
  );
}