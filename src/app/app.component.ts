import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {

  test: any;
  pregunta: any = {};
  preguntas: any[] = [];
  preguntadas: number[] = [];
  seleccionada: string;
  fruits: string[] = ["Banana", "Apple", "Guava", "Strawberry"];


  @ViewChild('inputFichero') _input: ElementRef;


  constructor() {
    console.log('Iniciamos...');
  }
  hayPregunta() {
    return Object.entries(this.pregunta).length === 0;
  }
  ngAfterViewChecked(): void {

    if (this.test) {
      let pregunta = {};
      for (let i = 0, j = 0; i < this.test.length; i++, j++) {
        if (j > 4) j = 0;
        if (j == 0) pregunta['pregunta'] = this.test[i];
        if (j == 1) pregunta['respuesta1'] = this.test[i];
        if (j == 2) pregunta['respuesta2'] = this.test[i];
        if (j == 3) pregunta['respuesta3'] = this.test[i];
        if (j == 4) pregunta['respuesta4'] = this.test[i];
        // if (j == 5) pregunta.correcta = this.test[i];
        if (j == 4) {
          this.preguntas.push(pregunta);
          pregunta = {};
        }
      }
    }
  }

  getAleatorio(max) {
    return Math.floor(Math.random() * max);
  }
  cargarArchivo(e) {
    let res;
    const fichero = e.target.files[0];
    if (!fichero) return;
    const reader = new FileReader();
    reader.readAsText(fichero);
    reader.onload = () => {
      res = reader.result;
      this.test = res.split('\n');
    };
  }

  getPregunta() {
    const aleatorio = this.getAleatorio(this.preguntas.length)
    this.preguntadas.push(aleatorio);
    return this.preguntas[aleatorio];
  }

  iniciar(){
    this.pregunta = this.getPregunta();
  }






  // leerArchivo(event) {    
  //   this.aux = 'valor 2';
  //   const file = event.target.files[0];    
  //   const reader = new FileReader();
  //   reader.readAsText(file);

  //   reader.onload = (event) => {
  //     const result = reader.result;            
  //     this.texto = 'dsfd';
  //   };
  // }

}


