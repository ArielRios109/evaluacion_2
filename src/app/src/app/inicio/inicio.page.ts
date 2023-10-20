import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})



export class InicioPage implements OnInit{

  constructor(private http: HttpClient){}
  
  usuario: Usuario | undefined;

  ngOnInit() {
    this.verificarInicioSesion();
  }

  verificarInicioSesion() {
    const ingresado = localStorage.getItem('ingresado');

    if (ingresado === 'true') {
      const usuariosData = localStorage.getItem('usuarios');

      if (usuariosData) {
        const usuarios: Usuario[] = JSON.parse(usuariosData);
        const nombreUsuario = localStorage.getItem('nombreUsuario');

        if (nombreUsuario) {
          this.usuario = usuarios.find((u: Usuario) => u.nombre === nombreUsuario);
        } else {
          console.error('El nombre de usuario no se ha registrado correctamente.');
        }
      }
    }
  }

  async verificarAPI() {
    // Reemplaza esta URL con la URL de tu API REST
    const apiUrl = 'http://localhost:8100/api/regiones';

    try {
      const data = await this.http.get(apiUrl).toPromise();
      console.log('Respuesta de la API:', data);
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  }

}
