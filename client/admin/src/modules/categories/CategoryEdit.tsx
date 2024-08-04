import React from 'react';
import { DateInput, Edit, ReferenceArrayInput, TabbedForm } from 'react-admin';
import { CommonCategoryFormFields } from './CategoryCreate';

export const CategoryEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="summary">
        <CommonCategoryFormFields />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="players">
        <DateInput name="startDate" source="startDate" />
        <DateInput name="endDate" source="endDate" />
        <ReferenceArrayInput name="players" source="players" reference="players"></ReferenceArrayInput>
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
