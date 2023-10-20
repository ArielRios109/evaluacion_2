import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jsQR, { QRCode } from 'jsqr';

interface Usuario {
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuario: Usuario | undefined;
  qrContent: string | undefined;
  router: any;

  constructor(private route: ActivatedRoute) {}

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

  openCamera() {
    const constraints = { video: { facingMode: 'environment' } };
  
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      const video = document.getElementById('video') as HTMLVideoElement;
      if (video) {
        video.srcObject = stream;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          video.onplay = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const scanQR = () => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const decodedQR = jsQR(imageData.data, imageData.width, imageData.height);
              if (decodedQR) {
                this.qrContent = decodedQR.data;
                this.router.navigate(['contenido-qr', { qrContent: this.qrContent }]);
              }
              requestAnimationFrame(scanQR);
            };
            requestAnimationFrame(scanQR);
          };
        }
      }
    }).catch((error) => {
      console.error('Error al acceder a la cámara:', error);
      alert('No se pudo acceder a la cámara.');
    });
  }
  
}
