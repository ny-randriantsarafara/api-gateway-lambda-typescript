import React from 'react';
import {
  Datagrid,
  DateField,
  ReferenceField,
  ReferenceManyField,
  Show,
  TabbedShowLayout,
  TextField,
} from 'react-admin';

const AssignedPlayers = () => {
  return (
    <ReferenceManyField reference="assignments" target="category">
      <Datagrid>
        <ReferenceField source="player" reference="players">
          <TextField source="firstName" /> <TextField source="lastName" />
        </ReferenceField>
        <DateField source="startDate" />
        <DateField source="endDate" />
      </Datagrid>
    </ReferenceManyField>
  );
};

export const CategoryShow = () => {
  return (
    <>
      <Show>
        <TabbedShowLayout>
          <TabbedShowLayout.Tab label="summary">
            <TextField source="name" />
            <TextField source="ageGroup" />
            <TextField source="gender" />
            <TextField source="description"/>
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="players" path="assignments">
            <ReferenceManyField reference="assignments" target="category">
              <Datagrid>
                <ReferenceField source="player" reference="players">
                  <TextField source="firstName" /> <TextField source="lastName" />
                </ReferenceField>
                <DateField source="startDate" />
                <DateField source="endDate" />
              </Datagrid>
            </ReferenceManyField>
          </TabbedShowLayout.Tab>
        </TabbedShowLayout>
      </Show>
    </>
  );
};
