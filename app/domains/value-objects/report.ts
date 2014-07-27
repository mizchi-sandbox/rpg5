module Wdr.ValueObjects {
  interface IReport {
    eventType: String;
    log: String;
    battlerId: String;
  }

  export class Report {
    eventType: String;
    log: String;
    battlerId: String;

    constructor(data: any){
      this.eventType = data.eventType;
      this.log = data.log;
      this.battlerId = data.battlerId;
    }
  }
}

