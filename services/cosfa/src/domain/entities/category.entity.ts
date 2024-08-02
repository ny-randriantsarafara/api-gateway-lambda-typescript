import { BaseEntity } from '@packages/shared';

export type CreateCategoryDTO = Partial<Category>;

export class Category extends BaseEntity<CreateCategoryDTO> {
  name: string;
  description?: string;
  gender: string;
  ageGroup: number;

  constructor(options: CreateCategoryDTO) {
    super(options);
    Object.assign(this, options);
  }
}
