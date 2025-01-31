import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule,DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, @Inject(DOCUMENT) public document: Document) { }

  login() {

  

    this.auth.loginWithRedirect({
      appState: {
        target: '/home'
      }
    });
  }

logout(){
  this.auth.logout ({
    logoutParams:{
      returnTo: this.document.location.origin
    }
  })
}





ngOnInit() {


}
}



