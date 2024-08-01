import React from 'react';
import { Edit, required, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" name="id" />
      <TextInput source="firstName" validate={required()} name="firstName" />
      <TextInput source="lastName" validate={required()} name="lastName" />
    </SimpleForm>
  </Edit>
);
