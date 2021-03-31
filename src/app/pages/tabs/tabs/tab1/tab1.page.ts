import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  registerForm: FormGroup;
  usuario: Users;
  constructor(private fb : FormBuilder,private oAuth: AuthService) { }
// ciclos componente
  ngOnInit() {
    console.log('init');
    this.cleanData();
  }

  cleanData(){
    this.registerForm = this.fb.group({
      nombres: ['' ,Validators.required],
      correo: ['' ,Validators.required],
      password: ['' ,Validators.required],
      direccion: ['', Validators.required],
      cedula: ['', Validators.required],
    });
  }

  ngOnDestroy(){
console.log('destroy aqui se mato el componente');
  }

  async onRegister(){
    debugger;
        this.usuario = {
          ...this.registerForm.value
        }

        await this.oAuth.register(this.usuario).then((data)=>{
        console.log('object despues del registro', data)
        this.cleanData();
        }
        ).catch(errr => console.log('error',errr));
  }

}
