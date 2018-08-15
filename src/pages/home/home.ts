import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  error: string;
  username: string;

  constructor(public navCtrl: NavController) { }

  goToConversation = () => {
    let user = this.username;
    if (user.trim().length > 0) {
      this.error = '';
      this.username = '';
      this.navCtrl.push('ConversationPage', { username: user });
    } else {
      this.error = "You must enter an username";
    }
  }

}
