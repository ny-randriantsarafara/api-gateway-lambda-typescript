import React from "react";
import {
  Edit,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" name="id" />
      <TextInput source="name" validate={required()} name="name" />
      <NumberInput source="ageGroup" validate={required()} name="ageGroup" />
      <SelectInput
        source="gender"
        choices={[
          { id: "G", name: "Garçon" },
          { id: "F", name: "Fille" },
        ]}
      />
      <TextInput name="description" source="description" multiline />
    </SimpleForm>
  </Edit>
);
