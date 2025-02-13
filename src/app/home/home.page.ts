import { Component, OnInit } from '@angular/core'; // Para la creación del componente y el ciclo de vida.
import { CommonModule } from '@angular/common'; // Necesario para las directivas básicas como ngIf, ngFor.
import { FormsModule } from '@angular/forms'; // Para trabajar con formularios (ngModel).
import { HttpClient } from '@angular/common/http'; // Para realizar solicitudes HTTP.
import { Router } from '@angular/router'; // Para navegar entre páginas.
import { AuthService } from '@auth0/auth0-angular'; // Para la autenticación con Auth0.
import { IonContent, IonHeader, IonToolbar, IonTitle, // Componentes de Ionic.
         IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet, 
         IonMenuButton, IonMenuToggle, IonListHeader, IonButton, 
         IonButtons, IonModal, IonRadio, IonItem,IonInput } from '@ionic/angular/standalone'; // Componente de Ionic.

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true, // Si es un componente standalone.
  imports: [
    CommonModule, // Importación del módulo común para directivas.
    FormsModule, // Importación del FormsModule para trabajar con formularios.
    IonContent, IonHeader, IonToolbar, IonTitle, // Componentes de la UI de Ionic.
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet, 
    IonMenuButton, IonMenuToggle, IonListHeader, IonButton, IonModal, 
    IonButtons, IonRadio, IonItem, IonInput // Más componentes de la UI de Ionic.
  ]
})
export class HomePage implements OnInit {
  public user_name: any;
 // public url: string = 'http://localhost:3000'; // URL del backend.
  public url: string = 'https://proyecto-final-back-2025.onrender.com';

  public username: string = ''; // Nombre de usuario.
  public auth_user: any; // Usuario autenticado.
  public db_user: any; // Usuario de la base de datos.

  constructor(
    private http: HttpClient, // Inyección del servicio HttpClient.
    private router: Router, // Inyección del servicio Router para navegación.
    private auth: AuthService, // Inyección del servicio AuthService de Auth0.
  
  ) { }

  ngOnInit() {
    // Cargar información del usuario desde Auth0.
    this.auth.user$.subscribe((data: any) => {
      this.auth_user = data;
      console.log(this.auth_user);
      this.loadUser();
    });
  }

  // Cargar el usuario desde la base de datos usando el email del usuario autenticado.
  loadUser() {
    this.http.get(`${this.url}/user/${this.auth_user.email}`).subscribe((response) => {
      console.log(response);
      this.db_user = response;
      if(response === 'usuario no encontrado') {
        this.createUser();
      }
    });
  }

  // Crear el usuario en la base de datos si no existe.
  createUser() {
    const users = {
      id: this.auth_user.email,
      nombre_usuario: this.auth_user.name
    };

    this.http.post(`${this.url}/adduser`, users).subscribe((response) => {
      console.log(response);
    });
  }

  // Función para enviar el username al backend.
  addUsername() {
    const user = {
      id: this.auth_user.email,
      username: this.username
    };

    // Realiza una solicitud POST al backend para guardar el username.
    this.http.post(`${this.url}/addusername`, user).subscribe((response) => {
      console.log(response); // Muestra la respuesta del servidor.
    });
  }

  // Función para navegar a la página de preguntas.
  navigateToQuestion1() {
    let data = { 
      nombre: this.auth_user.name, 
      picture: this.auth_user.picture, 
      email: this.auth_user.email
    }; 
    console.log(data);
    // Navega a la página '/preguntas'.
    this.router.navigate(['/preguntas', data]);
  }
}




  
