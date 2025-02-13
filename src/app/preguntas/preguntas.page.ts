import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
   IonMenuButton, IonMenuToggle, IonListHeader, IonButton,IonButtons,IonModal,IonRadio,IonItem,IonProgressBar } from '@ionic/angular/standalone';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
     IonMenuButton, IonMenuToggle, IonListHeader, IonButton,IonModal,IonButtons,IonRadio,IonItem,IonProgressBar],
})
export class PreguntasPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  // URL de la API
  public url: string = 'http://localhost:3000';
  //public url: string = 'https://proyecto-final-back-2025.onrender.com';
 public connectedUsers: any[] = []; // Lista de usuarios conectados

 
  // user-login
  public user_login: any;
  public username: any
  // Variables de datos
  public input_data: any; // Datos de las preguntas
  public input_user: any; // Información del usuario
  public user_data: any = []; // Lista de usuarios
  public question_data: any = []; // Pregunta actual
 

  // Variables de control
  public isIntervalRunning: boolean = false; // Para saber si el intervalo está activo

  public progress = 0; // Progreso de la barra de carga
  public counter: any; // Contador para la barra de carga
  public questionNumber = 1; // Número de la pregunta actual
  public puntuacion: number = 0; // Puntuación total
  public score: number = 0; // Puntaje del jugador
  public isDisabled: boolean = false; // Estado de los botones
  public pauseinterval: boolean = false; // Control del intervalo
  public interval: any; // Variable para manejar el intervalo
  public answers_data: any = []; // Respuestas posibles de la pregunta
  public input_answers: any; // Respuesta seleccionada
  public correct_answers_row: number = 3; // Respuestas correctas consecutivas

  public isButtonVisible: boolean = true; // Control de visibilidad del botón
  //public doubleScore : boolean = false

  // Colores para las respuestas
  public color_correct: string = ''; // Color de respuesta correcta
  public color_incorrect: string = ''; // Color de respuesta incorrecta

  public double_points: number = 1 // Para doble puntuación
  public counter_double_points : any
  public pista : boolean = false

  // Constructor con inyección de dependencias
  constructor(
    private navController: NavController,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private modalController: ModalController
    
  ) {}

  // Inicializa el componente y obtiene los datos iniciales
  ngOnInit() {
    
   
  
    this.user_login = this.route.snapshot.params
    this.username = this.user_login.email
    console.log (this.username)

    
   

    this.firstQuestion(); // Carga la primera pregunta
    this.showusername(); // Muestra el nombre del usuario
    this.randomQuestions(); // Carga las respuestas aleatorias
    this.score = 0; // Reinicia el puntaje
    
  
  }

  userConect() {
    this.http.get(`${this.url}/allUsers`).subscribe((response) => {
      console.log(response);
      this.input_data = response;
      if (this.input_data && this.input_data.length > 0) {
        this.connectedUsers = this.input_data;
      }
    });
    
  }

  // Carga la primera pregunta desde la API
  firstQuestion() {
    this.http.get(`${this.url}/pregunta1`).subscribe((response) => {
      console.log(response);
      this.input_data = response;
      if (this.input_data && this.input_data.length > 0) {
        this.question_data = this.input_data;
      }
    });
    this.Questions(); // Inicia el manejo del progreso
  }

  Questions() {
    if (this.isIntervalRunning) return // Si el intervalo ya está en ejecución, no lo reinicias.
  
    this.isIntervalRunning = true; // Marca el intervalo como en ejecución
  
    this.counter = setInterval(() => {
      this.progress += 0.01; // Incrementa el progreso
  
      // Cuando el progreso llega al 100%, pasa a la siguiente pregunta
      if (this.progress >= 1) {
        this.questionNumber++; // Incrementa el número de la pregunta
        setTimeout(() => {
          this.progress = 0; // Reinicia el progreso
          this.nextquestion(); // Carga la siguiente pregunta
  
          // Resetea los colores y desbloquea los botones
          this.color_correct = '';
          this.color_incorrect = '';
          this.isDisabled = false;
        });
      }
  
      // Si se logran 5 respuestas correctas consecutivas
      if (this.correct_answers_row == 5) {
        this.pause(); // Pausa el juego
        this.isButtonVisible = false; // Muestra el botón especial
       
        this.openModal();
  
        // Reinicia el juego después de 1 segundo
        setTimeout(() => {
          
          this.correct_answers_row = 0; // Reinicia el contador de respuestas correctas
         
        }, 1000);
      }
  
    }, 40); // Intervalo de 50ms
  }

  // Carga la siguiente pregunta desde la API
  nextquestion() {
    this.http.get(`${this.url}/pregunta/${this.questionNumber}`).subscribe((response) => {
      console.log(response);
      this.input_data = response;
      if (this.input_data && this.input_data.length > 0) {
        this.question_data = this.input_data;
        this.randomQuestions(); // Actualiza las respuestas aleatorias
      }
    });
  }

  // Baraja un arreglo para generar respuestas aleatorias
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Carga respuestas aleatorias para la pregunta actual
  randomQuestions() {
    this.http.get(`${this.url}/answers/${this.questionNumber}`).subscribe((response: any) => {
      console.log(response);
      if (response && response.length > 0) {
        const question = response[0];  
        if (this.pista == false){
        this.answers_data = this.shuffleArray([
          question.opcion_1,
          question.respuesta_correcta,
          question.opcion_2,
          question.opcion_3,
        ]);
      }

      if (this.pista == true){
        this.answers_data = this.shuffleArray([
          question.opcion_1,
          question.respuesta_correcta,
          
        ]);
      }
      }
    });
  }

  // Pausa el contador
  pause() {
  if (this.isIntervalRunning) {
    clearInterval(this.counter);
    this.isIntervalRunning = false; // Marca el intervalo como detenido
    
  }
}

// Reiniciar el contador y pasar a la siguiente pregunta
restart() {
  if (!this.isIntervalRunning) {
    this.Questions(); // Llama a la función de progreso solo si no hay intervalo en ejecución
    this.questionNumber++;
  }
}

  // Cierra el modal
  closeModal() {
    this.modal.dismiss(); // Cierra el modal
    this.restart(); // Reinicia el juego
  }

  openModal() {
    
      this.pause(); // Pausa el juego antes de abrir el modal
      this.modal.present(); // Luego presenta el modal
    
   

  }

  // Maneja la respuesta del usuario
  answerQuestion(input_answer: string) {
    const correctAnswer = this.question_data[0]?.respuesta_correcta;
    if (input_answer == 'correct_answer') {
      this.color_correct = 'success'; // Respuesta correcta
      this.correct_answers_row++;

      if (this.progress <= 0.2) {
        this.score = 10 * this.double_points + this.score;
        this.addScore(); // Guarda el puntaje
      } else if (this.progress <= 0.40) {
        this.score = 8 * this.double_points + this.score;
        this.addScore(); // Guarda el puntaje
      } else if (this.progress <= 0.60) {
        this.score = 6 * this.double_points + this.score;
        this.addScore(); // Guarda el puntaje
      } else if (this.progress <= 0.80) {
        this.score = 4 * this.double_points + this.score;
        this.addScore(); // Guarda el puntaje
      } else if (this.progress <= 1) {
        this.score = 2*this.double_points + this.score;
        this.addScore(); // Guarda el puntaje
      }
   
      this.isDisabled = true; // Desactiva los botones
    } else {
      this.correct_answers_row = 0; // Resetea el contador de respuestas correctas
      this.color_incorrect = 'danger'; // Respuesta incorrecta
      this.color_correct = 'success'; // Muestra la respuesta correcta
      this.isDisabled = true;
    }
  }


  selectedPower: string = ''; // Variable para almacenar la opción seleccionada
  selectPower(input_power:string){
    if (input_power  == 'doubleScore') {
      this.double_points = 2
      console.log("doble puntuacion activada")
    }

    if (input_power == 'pista'){
      console.log('pista activada')
      this.pista = true
      
    }

    if (input_power == 'removePoints'){
      console.log('pista activada')
     this.userConect()
      
    }


  

    


    this.counter_double_points = setInterval(() => {
      clearInterval(this.counter_double_points)
      this.double_points = 1
      this.pista = false
      console.log('poder inactivo')
    
    }, 15000);
  }

  // Muestra el nombre del usuario desde la API
  showusername() {
    if (!this.user_login) {
      console.error('Error: user_login.email no está definido');
      return;
    }
  
    console.log('Email que se está pasando:', this.user_login);
  
    this.http.get(`${this.url}/showusername/${this.username}`).subscribe((response) => {
      console.log(response);
      this.input_user = response;
      if (this.input_user && this.input_user.length > 0) {
        this.user_data = this.input_user;
        console.log(this.user_data[0].username)
      }
    });
  }


  public updatedUser: any
  substractPoints(input_userPoint: string): void {
    console.log(input_userPoint);
  
    let substract_score = { id: input_userPoint , id_origen:this.user_login.email  };
  
    this.http.post(`${this.url}/substractPoints`, substract_score).subscribe(
      (response: any) => {
        // La respuesta contiene los datos actualizados
        console.log(response);
  
        // Acceder a los datos del usuario actualizado
        if (input_userPoint){
        }else{
          this.score = response.updatedUser.puntos;
        console.log(`Puntuación actualizada: ${this.updatedUser.puntos}`);
        }
        // Puedes pasar los datos a tu UI o actualizar el estado en tu componente
         // Mostrar los datos actualizados
      },
      (error) => {
        console.error('Error al restar los puntos:', error);
      }
    );
  }


  

  addScore() {
 
    let score = { score: this.score, id : this.user_login.email };
   
    this.http.post(`${this.url}/addScore`, score).subscribe((response) => {
      console.log(response);
    });
    console.log('puntuacion alamacenada')
  }

  public input_score : any
  public show_score : any = []
  public score_show : number = 0




  // Propiedades relacionadas con el modal
  canDismiss = false;
  presentingElement!: HTMLElement | null;

  onTermsChanged(event: any, power: string) {
    console.log(`Power seleccionado: ${power}`);
    this.closeModal(); // Cierra el modal inmediatamente cuando se selecciona una opción
  }


}