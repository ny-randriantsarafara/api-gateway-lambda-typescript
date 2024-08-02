import { FilterList, FilterListItem } from 'react-admin';

export function getFieldValues(data: any[]): Record<string, Set<any>> {
  return data.reduce((acc: Record<string, Set<any>>, item: object) => {
    for (const [key, value] of Object.entries(item)) {
      if (!acc[key]) {
        acc[key] = new Set();
      }
      acc[key].add(value);
    }
    return acc;
  }, {});
}

export const generateFilterLists = (fieldValues: Record<string, Set<any>>, fields: string[]) => {
  return Object.entries(fieldValues)
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