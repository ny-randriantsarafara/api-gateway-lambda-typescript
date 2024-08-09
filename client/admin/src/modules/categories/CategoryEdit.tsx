import React from 'react';
import { DateInput, Edit, ReferenceArrayInput, TabbedForm } from 'react-admin';
import { CommonCategoryFormFields } from './CategoryCreate';
import AutocompleteTableInput from '../../common/components/AutocompleteTableInput';

export const CategoryEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="summary">
        <CommonCategoryFormFields />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="players">
        <DateInput name="startDate" source="startDate" />
        <DateInput name="endDate" source="endDate" />
        <AutocompleteTableInput
          source="players"
          reference="players"
          label="players"
          target="id"
        ></AutocompleteTableInput>
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
