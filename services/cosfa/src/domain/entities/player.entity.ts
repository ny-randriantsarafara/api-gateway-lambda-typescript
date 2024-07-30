import { BaseEntity } from '@packages/shared/src';

export type CreatePlayerDTO = Partial<Player>;

export class Player extends BaseEntity<CreatePlayerDTO> {
  firstName: string;
  lastName: string;

  constructor(options: CreatePlayerDTO) {
    super(options);
    Object.assign(this, options);
  }
}
