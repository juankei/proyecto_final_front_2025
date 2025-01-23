import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-poderes',
  templateUrl: './poderes.page.html',
  styleUrls: ['./poderes.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,IonicModule  ]
})
export class PoderesPage implements OnInit {

  constructor(private navController: NavController, private http: HttpClient,private router: Router) { }


  

  ngOnInit() {
  
  }

}
