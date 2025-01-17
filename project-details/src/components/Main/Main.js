import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services/baseService'; 
import Table from '../Table/Table';
import Pagination from '../Pagination/Pagination';
import {replaceDotWithUnderscore} from '../../utils/utils';

const Main = () => {
  const [allData, setAllData] = useState([]); // Store all fetched data
  const [displayData, setDisplayData] = useState([]); // Data to display on the current page
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false); 
  const itemsPerPage = 5; 

  // Fetch data once when the component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData(); 
        const modifiedData = replaceDotWithUnderscore(data);
        setAllData(modifiedData); // Store the data
        setTotalPages(Math.ceil(modifiedData.length / itemsPerPage)); 
        setDisplayData(modifiedData.slice(0, itemsPerPage)); // Set data for the first page
        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
        setDataLoaded(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = allData.slice(startIndex, startIndex + itemsPerPage);
    setDisplayData(paginatedData); 
    setDataLoaded(true);
  }, [currentPage, allData]);
  
  return (
    <div className="main-container ">
      <div className='app-title'>
        <h1> Discover Top Kickstarter Projects </h1>
        <h5 className='mt-1'>Explore highly-rated projects and their detailed funding statistics.</h5>
      </div>
      {(dataLoaded)  &&
        (<>
          <Table data={displayData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>)
        }
        {(!dataLoaded) &&
          (<h1 className='error-text'> Oops.. Encountered error while fetching data!</h1>)
        }
    </div>
  );
};

export default Main;
