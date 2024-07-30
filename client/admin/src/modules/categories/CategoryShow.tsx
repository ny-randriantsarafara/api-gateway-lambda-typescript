import React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";

export const CategoryShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="ageGroup" />
        <TextField source="gender" />
        <TextField source="description" />
      </SimpleShowLayout>
    </Show>
  );
};
