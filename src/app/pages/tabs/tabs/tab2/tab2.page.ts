import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  loginForm: FormGroup;
  constructor(private fb : FormBuilder,private oAuth: AuthService, private router:Router) { }

  ngOnInit() {
     this.loginForm = this.fb.group({
       correo: [''],
       password: ['']
     });


  }

  async onLogin(){
    
    await this.oAuth.login(this.loginForm.controls['correo'].value,this.loginForm.controls['password'].value).then(data => {
      console.log('Object ingreso satisfactorio',data)
      this.router.navigate([`/folder/${data.uid}`])

    }).catch(errr => console.log('error al ingresar',errr));
  }

}
