import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Results from '../results';
import { API_URL } from '../../consts';
import ReactPaginate from 'react-paginate';

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageLimit, setPageLimit] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [included, setIncluded] = useState([])
  const [dataFetcher, setDataFetcher] = useState(true)

  useEffect(() => {
    fetchData()
  }, [searchTerm, pageLimit, currentPage]);

  const fetchData = async () => {
    try {
      const offset = pageLimit*(currentPage-1)
      const url = API_URL + `?filter[keywords]=${searchTerm}&page[limit]=${pageLimit}&page[offset]=${offset}`
      const response = await axios.get(url);
      setDataFetcher(false)
      setSearchResults(response.data.data);
      setIncluded(response.data.included);
      const pages = response.data.meta.total/pageLimit 
      setTotalPages(Math.ceil(pages))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPageLimit(Number(value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col h-screen justify-start items-center w-screen">
      <div className="border border-grey w-full h-[12%] text-2xl fixed bg-white flex flex-row justify-around items-center">
        <input
          type="text"
          className="h-[67%] border border-black rounded w-1/3 mx-2 px-3"
          placeholder="Search"
          value={searchTerm}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          min="1"
          className="mx-2 h-[67%] border border-black rounded w-[15%] px-3"
          placeholder="Page Limit (25)"
          value={pageLimit}
          onChange={handleLimitChange}
        />
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={pageLimit}
          onPageChange={(selectedPage) => handlePageChange(selectedPage.selected + 1)}
          containerClassName="pagination"
          activeClassName="active"
          previousLabel="Previous"
          nextLabel="Next"
          className='flex flex-row w-[20%] mr-4'
        />
      </div>
      
      <div className="overflow-y-auto mt-4">
        <Results results={searchResults} included={included}></Results>
      </div>
    </div>
  );
}