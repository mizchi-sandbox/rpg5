module Wdr.ValueObjects{
  export class ValueWithMax {
    constructor(
      public current: number,
      public max: number
    ){
      this.max = max ? max : current;
    }
  }
}
