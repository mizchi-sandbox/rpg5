declare module Momic {
  export class Model {
    static find(query:any):any;
    static findOne(query:any):any;
    save(data: any): any;
  }
}

