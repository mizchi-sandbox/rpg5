module Wdr.Storages {
  export class Actor extends Momic.Model {
    public id: string;
    public ownerSaveId: string;
    public name: string;
    public lv: number;
    public job: string;
    public status: ValueObjects.Status;
  }
  Actor.prototype['key'] = 'actors';
}

module Wdr.Storages {
  export class SaveObject extends Momic.Model {
  }
  SaveObject.prototype['key'] = 'saves';
}
