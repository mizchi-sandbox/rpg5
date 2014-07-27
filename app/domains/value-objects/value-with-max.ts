module Wdr.ValueObjects{
  export class ValueWithMax {
    current: number;
    max: number;
    constructor(current: number, max: number){
      this.current = current;
      this.max = max ? max : current;
    }
  }
}
