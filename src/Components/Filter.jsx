"use client"
import React from 'react';

const Filter = ({difficultyFilter, handleDifficultyFilterChange, titleSearch, handleFilterSearch}) => {
  return (
    <div className='filter'>
      
      <div className="title_search">
        <label htmlFor="titleSearch">Title Search:</label>
        <input
          placeholder='Search'
          id="titleSearch"
          type="text"
          value={titleSearch}
          onChange={handleFilterSearch}
        />
      </div>

      <div className="difficulty_filter">
        <label htmlFor="difficultyFilter">Difficulty Filter:</label>
        <select id="difficultyFilter" value={difficultyFilter} onChange={handleDifficultyFilterChange}>
          <option defaultValue={""} value="">All</option>
          <option value="1">Beginner</option>
          <option value="2">Basic</option>
          <option value="3">Normal</option>
          <option value="4">Medium</option>
          <option value="5">Advanced</option>
          <option value="6">Hard</option>
          <option value="7">Extremal</option>
        </select>
      </div>

    </div>
  );
};

export default Filter;