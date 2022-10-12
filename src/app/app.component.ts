import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  test: any;
  @ViewChild('inputFichero') _input: ElementRef;
  

  constructor() {
    console.log('Iniciamos...');    
  }

  cargarArchivo(e) {
    let res;
    const fichero = e.target.files[0];
    if (!fichero) return;
    const reader = new FileReader();
    reader.readAsText(fichero);
    reader.onload = ()=>{
      res = reader.result;
      this.test = res;      
    };    
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


