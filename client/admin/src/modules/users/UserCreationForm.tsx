import React from "react";
import { Create, required, SimpleForm, TextInput } from "react-admin";

export const UserCreationForm = () => (
  <Create>
    <SimpleForm>
      <TextInput name="firstName" source="firstName" validate={[required()]} />
      <TextInput name="lastName" source="lastName" validate={[required()]} />
    </SimpleForm>
  </Create>
);
