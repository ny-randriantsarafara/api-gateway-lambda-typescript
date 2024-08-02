import React from 'react';
import { Edit, TabbedForm } from 'react-admin';
import { ContactFormFields, LocationFormFields, MainInfoFormFields } from './PlayerFormFields';
import { PlayerFormToolbar } from './PlayerFormToolbar';

export const PlayerEdit = () => (
  <Edit>
    <TabbedForm toolbar={<PlayerFormToolbar />}>
      <TabbedForm.Tab label="Personal Information">
        <MainInfoFormFields />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Location">
        <LocationFormFields />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Contact">
        <ContactFormFields />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
