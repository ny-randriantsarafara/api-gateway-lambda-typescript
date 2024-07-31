import { BaseEntity } from '@packages/shared';
import { Player } from './player.entity';
import { Category } from './category.entity';

export type CreateAssignmentDTO = Partial<Assignment>;

export class Assignment extends BaseEntity<Assignment> {
  player: string | Player;
  category: string | Category;
  startDate: Date;
  endDate: Date;

  constructor(options: CreateAssignmentDTO) {
    super(options);
    Object.assign(this, options);
  }
}
