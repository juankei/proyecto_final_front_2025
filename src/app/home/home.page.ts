import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthGuard } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  constructor( private http: HttpClient, private router: Router, private auth: AuthService,private navController: NavController,) { }

  public user_name: any
  // URL del backend donde se enviará la información
  public url: string = 'http://localhost:3000';

  // Variable para almacenar el nombre de usuario
  public username: string = '';

  public auth_user: any;
  public db_user: any;

  ngOnInit() {
    // Cargar información de usuario desde auth
    this.auth.user$.subscribe((data: any) =>{
      this.auth_user = data
      console.log(this.auth_user);
      this.loadUser()
    });
  }

  loadUser(){
    this.http.get(`http://localhost:3000/user/${this.auth_user.email}`).subscribe((response) => {
      console.log(response);
      this.db_user = response;
      if(response = 'usuario no encontrado'){
        this.createUser();
      
      }
    });
  }

  createUser(){

    
    const users = {
      id : this.auth_user.email,
      nombre_usuario: this.auth_user.name
    };
    
    this.http.post('http://localhost:3000/adduser', users).subscribe((response) => {
      console.log(response);
    });
  }


  // Función para enviar el username al backend
  addUsername() {
    const user = {
      id: this.auth_user.email,
      username: this.username
    };

    // Realiza una solicitud POST al backend para guardar el username
    this.http.post(`${this.url}/addusername`, user).subscribe((response) => {
      console.log(response); // Muestra la respuesta del servidor
    });

  }

  // Función para navegar a la página de preguntas
  navigateToQuestion1() {
    let data = { nombre: this.auth_user.name, picture: this.auth_user.picture, email: this.auth_user.email}; // Datos que queremos enviar
    console.log (data)
    // Navega a la página '/question1'
    this.router.navigate(['/preguntas', data])
    }

    
  }






  
