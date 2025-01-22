import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,IonicModule]
})
export class PreguntasPage implements OnInit {

  constructor(private navController: NavController, private http: HttpClient,private router: Router) { }

  // Propiedades de la clase
  public url: string = 'http://localhost:3000'; // URL de la API donde se obtienen las preguntas
  public input_data: any; // Variable para almacenar la respuesta de la API
  public input_user : any
  public user_data: any = []
  public question_data: any = []; // Almacena los datos de la pregunta actual
  public progress = 0; // Progreso de la barra de carga
  public counter: any; // Contador para la progresión del tiempo
  public questionNumber = 1; // Número de la pregunta actual
  public puntuacion: number = 0; // Puntuación total del jugador
  public score: number = 0; // Puntaje actual del jugador
  public isDisabled: boolean = false; 
  public pauseinterval : boolean = false
  public interval : any
  public answers_data :any = []
  public input_answers :any



  firstQuestion(){
    this.http.get(`${this.url}/pregunta1`).subscribe((response) => {
      console.log(response); 
      this.input_data = response; 
      if (this.input_data && this.input_data.length > 0) {
        this.question_data = this.input_data; 
      }
    });
    this.Questions()
  }

  // Función que maneja el inicio del juego
  Questions() {

    // Inicia un contador para simular el progreso del tiempo
    this.counter = setInterval(() => {
      this.firstQuestion
      this.progress += 0.01; // Aumenta el progreso cada 50ms

      // Si el progreso llega a 100%, pasa a la siguiente pregunta
      if (this.progress >= 1) {
        this.questionNumber++; // Incrementa el número de la pregunta

        // Cuando se cambia de pregunta, se reinicia el progreso y se obtiene la nueva pregunta
        setTimeout(() => {
          this.progress = 0; // Reinicia el progreso a 0
          this.nextquestion()

          // Resetea los colores de las respuestas previas
          this.color_correct = '';
          this.color_incorrect = '';
          this.isDisabled = false;

        });
      }




      if (this.questionNumber == 6  ) {
        // Pausa el juego
        this.addScore()
        this.pause();
        this.router.navigate(['/puntuacion']); // Navega a la página de puntuación
        
        // Espera 10 segundos para reiniciar el juego
        setTimeout(() => {
          this.questionNumber++
          this.restart(); // Reinicia el juego
        }, 10000); // 10 segundos (10,000 ms)
      }


      if (this.questionNumber == 10) {
        // Pausa el juego
        this.pause();
        this.router.navigate(['/puntuacion']); // Navega a la página de puntuación
        
        // Espera 10 segundos para reiniciar el juego
        setTimeout(() => {
          this.restart(); // Reinicia el juego
        }, 10000); // 10 segundos (10,000 ms)
      }


    }, 50);  //La función se ejecuta cada 50ms para actualizar el progreso
          
          
        
       

   
   
  
}


nextquestion(){
  this.http.get(`${this.url}/pregunta/${this.questionNumber}`).subscribe((response) => {
    console.log(response); 
    this.input_data = response; 
    if (this.input_data && this.input_data.length > 0) {
      this.question_data = this.input_data; 
    }});
}



randomQuestions(){
  this.http.get(`${this.url}/answers/${this.questionNumber}`).subscribe((response) => {
    console.log(response); 
    this.input_answers = response; 
    if (this.input_answers && this.input_answers.length > 0) {
      this.answers_data = this.input_data; 
    }});
}


pause (){
 clearInterval(this.counter)
}


restart (){
this.Questions();
  
}

  public color_correct: string = ''; // Color de la respuesta correcta
  public color_incorrect: string = ''; // Color de la respuesta incorrecta

  // Función para manejar la respuesta seleccionada por el usuario
  answerQuestion(input_answer: string) {
    if (input_answer == 'correct_answer') {
      this.color_correct = 'success'; // Si la respuesta es correcta, asigna el color de éxito
      
      if(this.progress <= 0.2){
        this.score+= 3000
        this.isDisabled = true
      }

      if(this.progress <= 0.20){
        this.score+= 2000
        this.isDisabled = true
      }

      if(this.progress <= 0.40){
        this.score+= 1000
        this.isDisabled = true
      }

      if(this.progress <= 0.60){
        this.score+= 500
        this.isDisabled = true
      }

      if(this.progress <= 0.80){
        this.score+= 300
        this.isDisabled = true
      }

      
      if(this.progress <= 1){
        this.score+= 100
        this.isDisabled = true
      }
      
    } else {
      this.color_incorrect = 'danger'; // Si la respuesta es incorrecta, asigna el color de peligro
      this.color_correct = 'success'; // También muestra la respuesta correcta
      this.isDisabled = true
    }
  }


  showusername(){
    this.http.get(`${this.url}/showusername/`).subscribe((response) => {
      console.log(response); 
      this.input_user = response; 
      if (this.input_user && this.input_user.length > 0) {
        this.user_data = this.input_user; // 
        console.log()
      }
    });

  }
  
  addScore() {
    let score = {
      score: this.score
    };

    this.http.post(`${this.url}/addScore`, score).subscribe((response) => {
      console.log(response); // Muestra la respuesta del servidor
    });
  }
  ngOnInit() {
    this.firstQuestion(); // Llama a la función para obtener la primera pregunta
    this.showusername()
   
  }

}
