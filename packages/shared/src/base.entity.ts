import { v4 } from 'uuid';
export class BaseEntity {
  id!: string;

  constructor(data: Partial<BaseEntity>) {
    Object.assign(this, data);
  }
  static generateId() {
    return v4();
  }

  static create(data: Partial<BaseEntity>) {
    return new BaseEntity({
      id: data.id || BaseEntity.generateId(),
      ...data,
    });
  };
}
