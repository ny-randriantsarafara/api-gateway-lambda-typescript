import { BaseEntity } from '@packages/shared';

export class Category extends BaseEntity {
    name: string;
    description?: string;
    gender: string
    ageGroup: number;
}
