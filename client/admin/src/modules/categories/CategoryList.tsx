import React, { useEffect, useState } from 'react';
import { Card, CardContent, Theme, useMediaQuery } from '@mui/material';
import { Datagrid, FilterLiveSearch, List, SimpleList, TextField, useDataProvider, useListContext } from 'react-admin';
import { generateFilterLists } from '../../common/utils/filters';

export const PostFilterSidebar = () => {
  const { resource } = useListContext();
  const [filtersValues, setFiltersValues] = useState<Record<string, any> | null>(null);
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchFilterValues = async () => {
      try {
        const { data } = await dataProvider.getFiltersValues(resource, { fields: ['ageGroup', 'gender'] });
        setFiltersValues(data);
      } catch (error) {
        console.error('Error fetching filter values:', error);
      }
    };

    fetchFilterValues();
  }, [resource]);

  if (filtersValues) {
    return (
      <Card sx={{ order: -1, mr: 2, mt: 6, width: 250 }}>
        <CardContent>
          <FilterLiveSearch name="name.search" source="name.search" />
          {generateFilterLists(filtersValues, ['ageGroup', 'gender'])}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export const CategoryList = () => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  return (
    <List aside={<PostFilterSidebar />}>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => record.gender}
          tertiaryText={record => record.description}
        />
      ) : (
        <Datagrid>
          <TextField source="name" />
          <TextField source="ageGroup" />
          <TextField source="gender" />
          <TextField source="description" />
        </Datagrid>
      )}
    </List>
  );
};
