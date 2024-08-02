import { BaseEntity } from '@packages/shared/src';

export type CreatePlayerDTO = Partial<Player>;

export type Address = {
  streetNumber?: string;
  neighborHood?: string;
  district?: string;
  postalCode?: string;
  region?: string;
  country?: string;
};

export type Contact = {
  phoneNumbers?: string[];
  emails?: string[];
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
