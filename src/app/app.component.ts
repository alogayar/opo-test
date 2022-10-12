import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  


  ngOnInit(): void {
    document
      .getElementById('file-input')
      .addEventListener('change', this.leerArchivo, false);
  }

  leerArchivo(event) {    
    const file = event.target.files[0];    
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (event) => {
      const result = reader.result;      
      const lineas = result.toString().split('\n')      
      console.log(lineas);
      document
      .getElementById('contenido-archivo').innerHTML = lineas.toString();


    };
  }
  
}


