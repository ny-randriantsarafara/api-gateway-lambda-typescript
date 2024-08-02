import { BaseEntity } from '@packages/shared/src';

export type CreatePlayerDTO = Partial<Player>;

export type Address = {
  streetNumber?: string;
  neighborhood?: string;
  district?: string;
  postalCode?: string;
  region?: string;
  country?: string;
};

export type Phone = { phoneNumber: string; label?: string };

export type Email = { emailAddress: string; label?: string };

export type Contact = {
  phones?: Phone[];
  emails?: Email[];
};

export class Player extends BaseEntity<CreatePlayerDTO> {
  firstName: string;
  lastName: string;
  birthDate: string | Date;
  address?: Address;
  contact?: Contact;

  constructor(options: CreatePlayerDTO) {
    super(options);
    Object.assign(this, options);
  }
}
