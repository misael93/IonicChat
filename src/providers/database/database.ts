import { Message } from './../../models/message';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs';


@Injectable()
export class DatabaseProvider {

  constructor(private _db: AngularFirestore) {
    console.log('Hello DatabaseProvider Provider');
  }

  addMessage(message: Message) {
    const id = this._db.createId();
    return this._db.doc(`messages/${id}`).set(message);
  }

  getMessages() {
    return this._db.collection<Message>('messages').valueChanges();
  }

}
