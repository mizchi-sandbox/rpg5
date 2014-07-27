// ValueWithMax = Wdr.ValueObjects.ValueWithMax

module Wdr.Entities.Battle {
  export class Battler extends Wdr.Entities.Base.Entity<Battler> {
    static create(data): Battler{
      return new Battler(
        data.name,
        data.lv,
        data.hp,
        data.wt,
        data.id
        );
    }

    public hp: ValueObjects.ValueWithMax;
    public wt: ValueObjects.ValueWithMax;
    constructor(
      public name,
      public lv,
      hp,
      wt,
      public id
    ) {
      super();
      this.hp = new ValueObjects.ValueWithMax(hp, hp);
      this.wt = new ValueObjects.ValueWithMax(0, wt);
    }

    toJSON() {
      return {
        name: this.name,
        id: this.id,
        lv: this.lv,
        wt: {
          current: this.wt.current,
          max: this.wt.max
        },
        hp: {
          current: this.hp.current,
          max: this.hp.max
        }
      }
    }
  }
}

