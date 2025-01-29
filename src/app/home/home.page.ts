import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  constructor( private http: HttpClient, private router: Router, private auth: AuthService) { }

  public user_name: any
  // URL del backend donde se enviará la información
  public url: string = 'http://localhost:3000';

  // Variable para almacenar el nombre de usuario
  public username: string = '';

  ngOnInit() {
    this.auth.user$.subscribe((data) => {
      this.user_name = data
      console.log(this.user_name)
    });
  }

  // Función para enviar el username al backend
  addUser() {
    const user = {
      username: this.username
    };

    // Realiza una solicitud POST al backend para guardar el username
    this.http.post(`${this.url}/addusername`, user).subscribe((response) => {
      console.log(response); // Muestra la respuesta del servidor
    });

  }

  // Función para navegar a la página de preguntas
  navigateToQuestion1() {
    // Navega a la página '/question1'
    this.router.navigate(['/preguntas'])
  }





}
