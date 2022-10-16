import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  cantidad: number = 50;  //numero de preguntas en examen
  test: any = null;
  pregunta: any = {};
  contador: number = 0;
  acertadas: number = 0;
  falladas: number = 0;
  preguntas: any[] = []; //array con todas las preguntas
  preguntadas: number[] = []; // array para guardar los numeros de las preguntas
  seleccionada: string = null; // opcion radiobuton
  respuestas: number[] = []; // array

  private disabled = true;
  private validarDisabled = false;

  @ViewChild('inputFichero') _input: ElementRef;
  @ViewChild('biniciar') _iniciar: ElementRef;
  @ViewChild('body') _body: ElementRef;



  constructor() {
    console.log('Iniciamos...');
  }  
  hayPregunta() {
    return Object.entries(this.pregunta??0).length === 0;
  }
  rellenaExamen(): void {
    if (this.test) {
      let pregunta = {};
      for (let i = 0, j = 0; i < this.test.length; i++, j++) {
        if (j > 5) j = 0;
        if (j == 0) pregunta['pregunta'] = this.test[i].replace('\r', '');
        if (j == 1) pregunta['respuesta1'] = this.test[i].replace('\r', '');
        if (j == 2) pregunta['respuesta2'] = this.test[i].replace('\r', '');
        if (j == 3) pregunta['respuesta3'] = this.test[i].replace('\r', '');
        if (j == 4) pregunta['respuesta4'] = this.test[i].replace('\r', '');
        if (j == 5) pregunta['correcta'] = this.test[i].replace('\r', '');
        if (j == 5) {
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
      this.test = res.replace('\r', '').split('\n');
    };
  }

  getPregunta() {
    this.disabled = true;
    this.validarDisabled = false;    
    if (this.contador < this.cantidad) {
      const pregunta = this.preguntas[this.preguntadas[this.contador]];      
      return pregunta;
    }
  }

  siguientePregunta() {    
    this.contador++;
    this.seleccionada = null;
    this._body.nativeElement.style.backgroundColor = '#fff';
    this.pregunta = this.getPregunta();
  }

  tam(){
    return (this.cantidad < this.preguntas.length) ? this.cantidad : this.preguntas.length;
  }
  // Crea un examen
  creaNumerodePreguntas() {
    this._iniciar.nativeElement.hidden = true;
    this.preguntadas = [];
    for (let i = 0; i < this.tam(); i++) {
      let buscar = true;
      let num = 0;
      while (buscar) {
        num = this.getAleatorio(this.preguntas.length);
        buscar = this.preguntadas.includes(num);
      }
      this.preguntadas.push(num);
    }
  }

  creaExamen() {
    this.contador = 0;
    this.rellenaExamen();
    this.creaNumerodePreguntas()
    
    
    console.log(this.test)
    console.log(this.preguntas)
    console.log(this.preguntadas);
    
    console.log(this.seleccionada)
    this.pregunta = this.getPregunta();
    console.log(this.preguntas)
  }

  validar() {
    console.log(this.pregunta);
    console.log('seleccionada:', this.seleccionada);
    
    if (!this.seleccionada) return;
    if (this.seleccionada.toString().trim() === this.pregunta.correcta.toString().trim()) {
      console.log('CORRECTA')
      this._body.nativeElement.style.backgroundColor = '#39f798';
      this.respuestas[this.contador - 1] = 1;
      this.acertadas++;
    }
    else {
      console.log('FALLADA');
      this._body.nativeElement.style.backgroundColor = '#fca4b8';
      this.respuestas[this.contador - 1] = 0;
      this.falladas++;
    }
    this.disabled = false;
    this.validarDisabled = false;
  }
  haySiguiente(){
    return (this.contador >= this.cantidad) ? false: true;
  }

}


