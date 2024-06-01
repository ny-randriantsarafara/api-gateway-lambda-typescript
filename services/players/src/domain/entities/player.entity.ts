import { BaseEntity } from '@packages/shared/src';

export class Player extends BaseEntity {
  firstName!: string;
  lastName!: string;
}