import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule,DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
   IonMenuButton, IonMenuToggle, IonListHeader, IonButton,IonButtons,IonModal,IonRadio,IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
     IonMenuButton, IonMenuToggle, IonListHeader, IonButton,IonModal,IonButtons,IonRadio,IonItem]
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService) { }

  login() {

  this.auth.loginWithRedirect({
      appState: {
        target: '/home'
      }
    });
  }







ngOnInit() {


}
}



