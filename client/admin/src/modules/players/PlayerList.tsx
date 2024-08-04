import React from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import { Datagrid, DateField, List, SimpleList, TextField } from 'react-admin';
import SidebarFilters from '../../common/components/SidebarFilter';

export const PlayerList = () => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
  return (
    <List
      aside={
        <SidebarFilters
          liveFilterFields={['firstName', 'lastName']}
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
