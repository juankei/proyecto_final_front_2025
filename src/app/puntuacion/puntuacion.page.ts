import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
   IonMenuButton, IonMenuToggle, IonListHeader, IonButton,IonButtons,IonModal,IonRadio,IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.page.html',
  styleUrls: ['./puntuacion.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
     IonMenuButton, IonMenuToggle, IonListHeader, IonButton,IonModal,IonButtons,IonRadio,IonItem]
})
export class PuntuacionPage implements OnInit {

  constructor(
    private navController: NavController,
  
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private modalController: ModalController
  ) {}

  
  counter : number = 0
  interval : any
  public url: string = 'http://localhost:3000'
  //public url: string = 'https://proyecto-final-back-2025.onrender.com';
  
  public input_score : any
  public score_data : any = []
  public user_login: any;
  ngOnInit() {
 
 this.user_login = this.route.snapshot.params
 console.log(this.user_login)
 this.score ()
  }


  score (){
    this.http.get(`${this.url}/score/`).subscribe((response) => {
      console.log(response); 
      this.input_score = response; 
      if (this.input_score && this.input_score.length > 0) {
        this.score_data = this.input_score; 
        console.log(this.score_data)
      }});
  }


 
 

}
