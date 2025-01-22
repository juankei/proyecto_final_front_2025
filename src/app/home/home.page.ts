import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [ IonicModule,CommonModule,FormsModule]
})
export class HomePage implements OnInit {
  constructor(private navController: NavController,private http: HttpClient,private router: Router) { }


  // URL del backend donde se enviará la información
  public url: string = 'http://localhost:3000';

  // Variable para almacenar el nombre de usuario
  public username: string = '';

  
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

 ngOnInit() {
 }

}
