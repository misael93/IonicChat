import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Message } from '../../models/message';

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  messages: Message[];
  message: Message;
  username: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private _db: DatabaseProvider
  ) {
    this.username = this.navParams.get('username').toLowerCase();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  ionViewWillLoad() {
    this.message = {
      username: this.username,
      text: '',
      date: null
    }
    this._db.getMessages()
    .subscribe(
        (messages) => {
          console.log(messages);
          this.messages = messages.sort((a, b) => {
            return (a.date > b.date) ? 1 : -1;
          });
        }
      );
  }

  sendMessage = () => {
    let msg = this.message.text.trim();
    if (msg.length > 0) {
      if (this.message.username) {
        this.message.text = msg;
        this.message.date = new Date();
        this._db.addMessage(this.message);
        this.message.text = '';
      } else {
        console.log('User is undefined');
      }
    } else {
      console.log('empty message');
    }
  }

  isThisMe = (user) => {
    return (user.toLowerCase() === this.username.toLowerCase()) ? true : false;
  }

}
