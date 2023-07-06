import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Results from '../results';

export default function SearchComponent() {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  let timer: NodeJS.Timeout;

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    console.log('trying to fetch data')
    try {
      const response = await axios.get('https://search.outdoorsy.com/rentals');
      console.log('response??? ', response.data)
      console.log('response.data??? ', response.data.data )
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const { value } = event.target;
    setSearchTerm(value);

    // Wait for 1 second after the last change before making the API request
    timer = setTimeout(() => {
      fetchData();
    }, 1000);
  };



  return (
    <div className="flex flex-col h-screen justify-center items-center w-screen mt-4">
      <input
        type="text"
        className="p-2 border border-grey rounded w-[50%]"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="overflow-y-auto mt-4">
        <Results results={searchResults}></Results>
      </div>
    </div>
  );
}