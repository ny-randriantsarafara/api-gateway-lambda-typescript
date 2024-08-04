import React from 'react';
import { Card, CardContent, Theme, useMediaQuery } from '@mui/material';
import { Datagrid, DateField, FilterLiveSearch, List, SimpleList, TextField, useListContext } from 'react-admin';
import SidebarFilters, { generateFilterLists } from '../../common/components/SidebarFilter';

export const PlayerList = () => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
  return (
    <List
      aside={
        <SidebarFilters
          liveFilterFields={['firstName', 'lastName', 'birhtDate']}
          valueFilterFields={['address.country', 'address.region', 'address.district', 'address.postalCode']}
        />
      }
    >
      {isSmall ? (
        <SimpleList primaryText={record => record.firstName} secondaryText={record => record.lastName} />
      ) : (
        <Datagrid>
          <TextField source="firstName" />
          <TextField source="lastName" />
          <DateField source="birthDate" />
        </Datagrid>
      )}
    </List>
  );
};
