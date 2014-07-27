module Wdr.Entities {
  interface Status {
    str: number;
    int: number;
    dex: number;
  }

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
      public status: Status
    ){
      super();
    }
  }
}
