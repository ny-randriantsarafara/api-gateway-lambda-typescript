import { FilterList, FilterListItem } from 'react-admin';

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