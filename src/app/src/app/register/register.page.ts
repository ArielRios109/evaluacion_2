import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private navCtrl: NavController,
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async guardar() {
    const f = this.formularioRegistro.value;
  
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Es necesario llenar todos los datos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }
  
    // Crear un objeto de usuario con los datos del formulario
    const usuario = {
      nombre: f.nombre,
      apellido: f.apellido,
      rut: f.rut,
      region: f.region,
      comuna: f.comuna,
      password: f.password,
    };
  
    // Obtener la lista de usuarios existente o crear una nueva si no existe
    let usuarios: any[] = [];
  
    // Verificar si la clave 'usuarios' existe en el localStorage y no es null
    const usuariosData = localStorage.getItem('usuarios');
    if (usuariosData !== null) {
      usuarios = JSON.parse(usuariosData);
    }
  
    // Agregar el nuevo usuario a la lista
    usuarios.push(usuario);
  
    // Guardar la lista de usuarios actualizada en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
    localStorage.setItem('registrado', 'true');
    this.navCtrl.navigateRoot('login');
  }
  
}
