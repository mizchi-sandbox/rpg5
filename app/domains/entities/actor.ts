module Wdr.Entities {
  export class Actor extends Base.Entity<Actor> {
    static create(data): Actor {
      return new Actor(
        data.name,
        data.lv,
        data.job,
        data.status
      )
    }

    constructor(
      public name: string,
      public lv: number,
      public job: string,
      public status: Wdr.ValueObjects.Status
    ){
      super();
    }
  }
}
