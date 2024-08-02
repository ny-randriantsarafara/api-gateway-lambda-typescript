import { Card, CardContent, Theme, useMediaQuery } from '@mui/material';
import { Datagrid, DateField, FilterLiveSearch, List, SimpleList, TextField, useListContext } from 'react-admin';
import { generateFilterLists, getFieldValues } from '../../common/utils/filters';
import React from 'react';

export const UserFilterSidebar = () => {
  const { data } = useListContext();

  if (typeof data !== 'undefined') {
    return (
      <Card sx={{ order: -1, mr: 2, mt: 6, width: 250 }}>
        <CardContent>
          <FilterLiveSearch name="firstName.search" source="firstName.search" label="First name" />
          <FilterLiveSearch name="lastName.search" source="lastName.search" label="Last name" />
          {generateFilterLists(getFieldValues(data), [])}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export const PlayerList = () => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
  return (
    <List aside={<UserFilterSidebar />}>
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
