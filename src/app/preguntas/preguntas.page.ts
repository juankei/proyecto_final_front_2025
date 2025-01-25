import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CheckboxCustomEvent } from '@ionic/angular/standalone';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class PreguntasPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  // URL de la API
  public url: string = 'http://localhost:3000';

  // Variables de datos
  public input_data: any; // Datos de las preguntas
  public input_user: any; // Información del usuario
  public user_data: any = []; // Lista de usuarios
  public question_data: any = []; // Pregunta actual

  // Variables de control
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
  public correct_answers_row: number = 4; // Respuestas correctas consecutivas
  public power_score: boolean = false; // Modo de puntaje doble
  public isButtonVisible: boolean = false; // Control de visibilidad del botón

  // Colores para las respuestas
  public color_correct: string = ''; // Color de respuesta correcta
  public color_incorrect: string = ''; // Color de respuesta incorrecta

  // Constructor con inyección de dependencias
  constructor(
    private navController: NavController,
    private http: HttpClient,
    private router: Router,
    private modalController: ModalController
  ) {}

  // Inicializa el componente y obtiene los datos iniciales
  ngOnInit() {
    this.firstQuestion(); // Carga la primera pregunta
    this.showusername(); // Muestra el nombre del usuario
    this.randomQuestions(); // Carga las respuestas aleatorias
    this.score = 0; // Reinicia el puntaje
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

  // Maneja el progreso del juego y el cambio de preguntas
  Questions() {
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
        this.isButtonVisible = true; // Muestra el botón especial
        this.addScore(); // Guarda el puntaje
        this.pause(); // Pausa el juego

        // Reinicia el juego después de 1 segundo
        setTimeout(() => {
          this.closeModal();
          this.correct_answers_row = 0; // Reinicia el contador de respuestas correctas
          this.power_score = true; // Activa el modo de puntaje doble
        }, 1000);
      }
    }, 50); // Intervalo de 50ms
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
        const question = response[0]; // Supone una pregunta por ID
        this.answers_data = this.shuffleArray([
          question.opcion_1,
          question.respuesta_correcta,
          question.opcion_2,
          question.opcion_3,
        ]);
      }
    });
  }

  // Pausa el contador
  pause() {
    clearInterval(this.counter);
  }

  // Reinicia el contador y pasa a la siguiente pregunta
  restart() {
    this.Questions();
    this.questionNumber++;
  }

  // Cierra el modal
  closeModal() {
    this.modal.dismiss(); // Cierra el modal
    this.restart(); // Reinicia el juego
  }

  // Maneja la respuesta del usuario
  answerQuestion(input_answer: string) {
    const correctAnswer = this.question_data[0]?.respuesta_correcta;
    if (input_answer == 'correct_answer') {
      this.color_correct = 'success'; // Respuesta correcta
      this.correct_answers_row++;

      if (this.power_score) {
        this.score *= 2; // Aplica el puntaje doble
      } else {
        this.score += 1; // Incrementa el puntaje
      }
      this.isDisabled = true; // Desactiva los botones
    } else {
      this.correct_answers_row = 0; // Resetea el contador de respuestas correctas
      this.color_incorrect = 'danger'; // Respuesta incorrecta
      this.color_correct = 'success'; // Muestra la respuesta correcta
      this.isDisabled = true;
    }
  }

  // Muestra el nombre del usuario desde la API
  showusername() {
    this.http.get(`${this.url}/showusername/`).subscribe((response) => {
      console.log(response);
      this.input_user = response;
      if (this.input_user && this.input_user.length > 0) {
        this.user_data = this.input_user;
      }
    });
  }

  // Envía el puntaje actual a la API
  addScore() {
    let score = { score: this.score };
    this.http.post(`${this.url}/addScore`, score).subscribe((response) => {
      console.log(response);
    });
  }

  // Propiedades relacionadas con el modal
  canDismiss = false;
  presentingElement!: HTMLElement | null;

  // Cambia el estado del modal al aceptar los términos
  onTermsChanged(event: CheckboxCustomEvent) {
    this.canDismiss = event.detail.checked;
  }
}
