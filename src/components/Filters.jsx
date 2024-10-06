import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Filters = ({onFiltersChange}) => {

    const [filters, setFilters] = useState({
        education: false,
        social: false,
        recreational: false,
        charity: false,
        relaxation: false,
        cooking: false,
        busywork: false,
      });
    
      const toggleFilter = (filter) => {
        setFilters((prev) => ({
          ...prev,
          [filter]: !prev[filter],
        }));
      };

    const filterNames = [
      { key: "education", label: "Educació" },
      { key: "social", label: "Social" },
      { key: "recreational", label: "Recreacional" },
      { key: "charity", label: "Caritat" },
      { key: "cooking", label: "Cuinar" },
      { key: "relaxation", label: "Relaxació" },
      { key: "busywork", label: "Treball intens" },
    ];

    useEffect(() => {
      onFiltersChange(filters);

    }, [filters, onFiltersChange]);


    return (
      <div className="max-w-fit flex flex-wrap justify-center p-3">
        {filterNames.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className={`btn btn-sm rounded-2xl m-1 p-2 ${
              filters[key] ? 'bg-[#7a52e8] text-white' : 'bg-gray-100 text-black'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };

  Filters.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
  };
  
  export default Filters;
  