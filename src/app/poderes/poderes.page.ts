import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
   IonMenuButton, IonMenuToggle, IonListHeader, IonButton,IonButtons,IonModal,IonRadio,IonItem,IonProgressBar,IonRadioGroup } from '@ionic/angular/standalone';




@Component({
  selector: 'app-poderes',
  templateUrl: './poderes.page.html',
  styleUrls: ['./poderes.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
     IonMenuButton, IonMenuToggle, IonListHeader, IonButton,IonModal,IonButtons,IonRadio,IonItem,IonProgressBar,IonRadioGroup   ]
})
export class PoderesPage implements OnInit {

  constructor(private navController: NavController, private http: HttpClient,private router: Router,private route: ActivatedRoute) { }


  public score : any
  public url: string = 'http://localhost:3000';
  //public url: string = 'https://proyecto-final-back-2025.onrender.com';
  public input_data : any
  public score_users : any = []
  ngOnInit() {
    this.userConect()
    this.score = this.route.snapshot.params
    console.log(this.score.username)
    
  }

  userConect() {
    this.http.get(`${this.url}/showPower/${this.score.username}`).subscribe((response) => {
      console.log(response);
      this.input_data = response;
      if (this.input_data && this.input_data.length > 0) {
        this.score_users = this.input_data;
      }
    });
    
  }
}
