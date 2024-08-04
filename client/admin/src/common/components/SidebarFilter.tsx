import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { FilterList, FilterListItem, FilterLiveSearch, useDataProvider, useListContext } from 'react-admin';

type FilterSidebarProps = {
  liveFilterFields: string[];
  valueFilterFields: string[];
};

const SidebarFilters: React.FC<FilterSidebarProps> = ({ liveFilterFields, valueFilterFields }) => {
  const { resource } = useListContext();
  const [filtersValues, setFiltersValues] = useState<Record<string, any> | null>(null);
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchFilterValues = async () => {
      try {
        const { data } = await dataProvider.getFiltersValues(resource, { fields: valueFilterFields });
        setFiltersValues(data);
      } catch (error) {
        console.error('Error fetching filter values:', error);
      }
    };

    fetchFilterValues();
  }, [resource, valueFilterFields, dataProvider]);

  if (filtersValues) {
    return (
      <Card sx={{ order: -1, mr: 2, mt: 6, width: 250 }}>
        <CardContent>
          {generateLiveSearchFilters(liveFilterFields)}
          {generateFilterLists(filtersValues, valueFilterFields)}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default SidebarFilters;

export const generateLiveSearchFilters = (fields: string[]) => {
  return fields.map(field => (
    <FilterLiveSearch label={field} name={`${field}.search`} source={`${field}.search`} key={`filter-${field}`} />
  ));
};

export const generateFilterLists = (filterValues: Record<string, Set<any>>, fields: string[]) => {
  return Object.entries(filterValues)
    .filter(([field]) => fields.includes(field))
    .map(([field, values]) => (
      <FilterList label={field} icon={<> </>} key={`filter-${field}`}>
        {Array.from(values).map(value => (
          <FilterListItem
            label={String(value)}
            value={{
              [`${field}.eq`]: value,
            }}
            key={String(value)}
          />
        ))}
      </FilterList>
    ));
};
