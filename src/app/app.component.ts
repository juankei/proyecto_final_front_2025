import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { IonContent, IonHeader, IonToolbar, IonTitle, 
         IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet, 
         IonMenuButton, IonMenuToggle, IonListHeader, IonButton, 
         IonButtons, IonModal, IonRadio, IonItem, IonProgressBar } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  providers: [ModalController, AuthService ],  // Asegúrate de que AuthService esté en los providers
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonIcon,
    IonMenu,
    IonLabel,
    IonRouterOutlet,
    IonMenuButton,
    IonMenuToggle,
    IonListHeader,
    IonButton,
    IonModal,
    IonButtons,
    IonRadio,
    IonItem,
    IonProgressBar
  ]
})

export class AppComponent {
  public appPages = [
    { title: 'home', url: '/home', icon: 'home' },
    { title: 'preguntas', url: '/preguntas', icon: 'help' },
    { title: 'puntuacion', url: '/puntuacion', icon: 'help' },
    { title: 'poderes', url: '/poderes', icon: 'help' },
    { title: 'login', url: '/login', icon: 'help' }
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons(icons);
  }
}
