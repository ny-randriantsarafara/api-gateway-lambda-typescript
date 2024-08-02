import { ArrayInput, DateInput, required, SimpleFormIterator, TextInput } from 'react-admin';
import React from 'react';

export const MainInfoFormFields = () => {
  return (
    <>
      <TextInput name="firstName" source="firstName" validate={[required()]} />
      <TextInput name="lastName" source="lastName" validate={[required()]} />
      <DateInput name="birthDate" source="birthDate" validate={[required()]} />
    </>
  );
};

export const LocationFormFields = () => {
  return (
    <>
      <TextInput source="address.streetNumber" />
      <TextInput source="address.neighborhood" />
      <TextInput source="address.district" />
      <TextInput source="address.postalCode" />
      <TextInput source="address.region" />
      <TextInput source="address.country" />
    </>
  );
};

export const ContactFormFields = () => {
  return (
    <>
      <ArrayInput source="contact.phones">
        <SimpleFormIterator inline>
          <TextInput source="phoneNumber" />
          <TextInput source="label" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="contact.emails">
        <SimpleFormIterator inline>
          <TextInput source="emailAddress" />
          <TextInput source="label" />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  );
};
