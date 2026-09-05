'use client';

import * as React from 'react';
import { useLocation } from '../context/location-context';

export interface MarketplaceSearchOptions<T> {
  data: T[];
  searchFields: (item: T) => string[];
  categoryField?: (item: T) => string;
  locationField?: (item: T) => string;
}

export function useMarketplaceSearch<T>({
  data,
  searchFields,
  categoryField,
  locationField,
}: MarketplaceSearchOptions<T>) {
  const { location } = useLocation();

  const [query, setQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedDivision, setSelectedDivision] = React.useState('all');
  const [selectedDistrict, setSelectedDistrict] = React.useState('all');
  const [onlyNearMe, setOnlyNearMe] = React.useState(false);
  const [onlyVerified, setOnlyVerified] = React.useState(false);

  // Sync default location filter with detected live location if enabled
  React.useEffect(() => {
    if (onlyNearMe && location.district) {
      setSelectedDistrict(location.district);
    }
  }, [onlyNearMe, location.district]);

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // 1. Search Query Match
      if (query.trim()) {
        const fields = searchFields(item);
        const matchesQuery = fields.some((f) =>
          f.toLowerCase().includes(query.trim().toLowerCase())
        );
        if (!matchesQuery) return false;
      }

      // 2. Category Match
      if (selectedCategory !== 'all' && categoryField) {
        const cat = categoryField(item);
        if (cat.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }

      // 3. Location / District Match
      if (selectedDistrict !== 'all' && locationField) {
        const loc = locationField(item);
        if (!loc.toLowerCase().includes(selectedDistrict.toLowerCase())) return false;
      }

      // 4. Division Match
      if (selectedDivision !== 'all' && locationField) {
        const loc = locationField(item);
        if (!loc.toLowerCase().includes(selectedDivision.toLowerCase())) return false;
      }

      return true;
    });
  }, [data, query, selectedCategory, selectedDivision, selectedDistrict, searchFields, categoryField, locationField]);

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDivision,
    setSelectedDivision,
    selectedDistrict,
    setSelectedDistrict,
    onlyNearMe,
    setOnlyNearMe,
    onlyVerified,
    setOnlyVerified,
    filteredData,
    totalCount: filteredData.length,
    userLocation: location,
  };
}

