export abstract class BaseEntity<T> {
  protected constructor(options: Partial<T>) {
    Object.assign(this, options);
  }

  static create<T, D>(this: new (options: D) => T, data: D): T {
    return new this(data);
  }
}
