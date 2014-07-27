module Wdr.Entities.Base {
  export class Id<T> {
    public value: String = _.uniqueId();
  }

  export class Entity<T> {
    public id = new Id<T>();
    public equals(other: Entity<T>): boolean {
      return this.id.value === other.id.value;
    }
  }
}
