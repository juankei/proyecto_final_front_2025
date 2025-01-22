
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';

//import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive,IonicModule ],
})
export class AppComponent {
  public appPages = [
    { title: 'home', url: '/home', icon: 'home' },
    { title: 'preguntas', url: '/preguntas', icon: 'help' },
    { title: 'puntuacion', url: '/puntuacion', icon: 'help' }
  
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    addIcons(icons);
  }
}
