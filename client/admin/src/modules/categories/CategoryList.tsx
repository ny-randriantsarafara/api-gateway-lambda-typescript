import React, { useEffect, useState } from 'react';
import { Card, CardContent, Theme, useMediaQuery } from '@mui/material';
import { Datagrid, FilterLiveSearch, List, SimpleList, TextField, useDataProvider, useListContext } from 'react-admin';
import SidebarFilters, { generateFilterLists } from '../../common/components/SidebarFilter';

export const CategoryList = () => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  return (
    <List aside={<SidebarFilters liveFilterFields={['name']} valueFilterFields={['ageGroup', 'gender']} />}>
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
