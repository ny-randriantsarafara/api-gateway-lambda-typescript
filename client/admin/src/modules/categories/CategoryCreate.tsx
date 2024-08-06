import React from 'react';
import { Create, NumberInput, required, SelectInput, TabbedForm, TextInput } from 'react-admin';
import AutocompleteTableInput from '../../common/components/AutoompleteTableInput';

export const CommonCategoryFormFields = () => {
  return (
    <>
      <TextInput source="name" validate={required()} name="name" />
      <NumberInput source="ageGroup" validate={required()} name="ageGroup" />
      <SelectInput
        name="gender"
        source="gender"
        choices={[
          { id: 'G', name: 'Garçon' },
          { id: 'F', name: 'Fille' },
        ]}
      />
      <TextInput name="description" source="description" multiline />
    </>
  );
};

export const CategoryCreate = () => (
  <Create>
    <TabbedForm>
      <TabbedForm.Tab label="summary">
        <CommonCategoryFormFields />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="players" disabled>
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);
