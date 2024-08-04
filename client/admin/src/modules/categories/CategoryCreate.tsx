import React from 'react';
import { Create, NumberInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} name="name" />
      <NumberInput source="ageGroup" validate={required()} name="ageGroup" />
      <SelectInput
        source="gender"
        choices={[
          { id: 'G', name: 'Garçon' },
          { id: 'F', name: 'Fille' },
        ]}
      />
      <TextInput name="description" source="description" multiline />
    </SimpleForm>
  </Create>
);
