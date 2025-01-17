// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services/baseService'; 
import Table from '../Table/Table';
import {replaceDotWithUnderscore} from '../../utils/utils';

const Main = () => {
  const [allData, setAllData] = useState([]); // Store all fetched data
  const [displayData, setDisplayData] = useState([]); // Data to display on the current page
  const itemsPerPage = 5; 

  // Fetch data once when the component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData(); 
        const modifiedData = replaceDotWithUnderscore(data);
        setAllData(modifiedData); // Store the data
        setDisplayData(modifiedData.slice(0, itemsPerPage)); // Set data for the first page
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  
  return (
    <div className="main-container ">
      <div className='app-title'>
        <h1> Discover Top Kickstarter Projects </h1>
        <h5 className='mt-1'>Explore highly-rated projects and their detailed funding statistics.</h5>
      </div>
      <Table data={displayData} />
    
    </div>
  );
};

export default Main;
