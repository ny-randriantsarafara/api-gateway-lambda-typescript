import React from 'react';
import { SaveButton, Toolbar } from 'react-admin';

export const PlayerFormToolbar = () => {
  return (
    <Toolbar>
      <SaveButton
        type="button"
        transform={rawValue => {
          const { address, contact, ...mainInformation } = rawValue;
          return {
            ...mainInformation,
            address,
            contact,
          };
        }}
      ></SaveButton>
    </Toolbar>
  );
};
