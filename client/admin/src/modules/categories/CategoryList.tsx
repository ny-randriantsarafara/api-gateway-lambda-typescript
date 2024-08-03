import React from 'react';
import { Card, CardContent, Theme, useMediaQuery } from '@mui/material';
import { Datagrid, FilterLiveSearch, List, SimpleList, TextField, useListContext } from 'react-admin';
import { generateFilterLists } from '../../common/utils/filters';

export const PostFilterSidebar = () => {
  const listContext = useListContext();
  const { resource } = listContext;
  const filtersValues = localStorage.getItem(`${resource}-filtersValues`);

  if (filtersValues && typeof filtersValues !== 'undefined') {
    return (
      <Card sx={{ order: -1, mr: 2, mt: 6, width: 250 }}>
        <CardContent>
          <FilterLiveSearch name="name.search" source="name.search" />
          {generateFilterLists(JSON.parse(filtersValues), ['ageGroup', 'gender'])}
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
