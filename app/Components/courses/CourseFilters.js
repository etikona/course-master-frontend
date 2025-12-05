"use client";

import { useState, useEffect } from "react";
import { useCourses } from "@/app/hooks/useRedux";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const CourseFilters = () => {
  const { filters, setFilters, clearFilters } = useCourses();
  const [localFilters, setLocalFilters] = useState(filters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Categories (in real app, fetch from API)
  const categories = [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Cybersecurity",
    "Business",
    "Design",
    "Marketing",
  ];

  const sortOptions = [
    { value: "createdAt", label: "Newest" },
    { value: "price", label: "Price" },
    { value: "rating", label: "Rating" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(localFilters);
    }, 500);

    return () => clearTimeout(timer);
  }, [localFilters, setFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setLocalFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      sortOrder: "asc",
    });
    clearFilters();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FiFilter className="mr-2" /> Filter Courses
        </h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {showAdvanced ? "Hide Advanced" : "Show Advanced"}
        </button>
      </div>

      {/* Basic Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search courses..."
            value={localFilters.search}
            onChange={handleChange}
            className="input-field pl-10"
          />
        </div>

        {/* Category Filter */}
        <select
          name="category"
          value={localFilters.category}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <select
          name="sortBy"
          value={localFilters.sortBy}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Sort By</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Sort Order */}
        <select
          name="sortOrder"
          value={localFilters.sortOrder}
          onChange={handleChange}
          className="input-field"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              placeholder="$0"
              value={localFilters.minPrice}
              onChange={handleChange}
              className="input-field"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              placeholder="$1000"
              value={localFilters.maxPrice}
              onChange={handleChange}
              className="input-field"
              min="0"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleClear}
              className="btn-secondary flex items-center justify-center w-full"
            >
              <FiX className="mr-2" /> Clear All
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2">
        {localFilters.search && (
          <span className="badge badge-primary">
            Search: {localFilters.search}
            <button
              onClick={() =>
                setLocalFilters((prev) => ({ ...prev, search: "" }))
              }
              className="ml-2"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        )}
        {localFilters.category && (
          <span className="badge badge-primary">
            Category: {localFilters.category}
            <button
              onClick={() =>
                setLocalFilters((prev) => ({ ...prev, category: "" }))
              }
              className="ml-2"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        )}
        {localFilters.minPrice && (
          <span className="badge badge-primary">
            Min: ${localFilters.minPrice}
            <button
              onClick={() =>
                setLocalFilters((prev) => ({ ...prev, minPrice: "" }))
              }
              className="ml-2"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        )}
        {localFilters.maxPrice && (
          <span className="badge badge-primary">
            Max: ${localFilters.maxPrice}
            <button
              onClick={() =>
                setLocalFilters((prev) => ({ ...prev, maxPrice: "" }))
              }
              className="ml-2"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default CourseFilters;
