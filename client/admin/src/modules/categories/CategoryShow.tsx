import React from "react";
import {
  Datagrid,
  DateField,
  ReferenceField,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

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
      <Show aside={<AssignedPlayers />}>
        <SimpleShowLayout>
          <TextField source="name" />
          <TextField source="ageGroup" />
          <TextField source="gender" />
        </SimpleShowLayout>
      </Show>
    </>
  );
};
