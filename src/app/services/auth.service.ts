import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { User } from '../models/user';
import{switchMap} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$ : Observable<User>;
  
  constructor(private oAuth:AngularFireAuth,
              private  afs:AngularFirestore) { 
                this.user$ =  this.oAuth.authState.pipe(
                  switchMap((user) => {
                    if(user){
                      return this.afs.doc<User>(`user/${user.uid}`).snapshotChanges();
                    }
                    return of(null);
                  })
                );            
              }

  async login(email: string , password: string) {
    try{
      const { user } = await this.oAuth.signInWithEmailAndPassword(
        email,
        password
      );
     
      return user;
    }catch(error){
          console.log('error', error);
    }
  }

  async register(usuario: Users) {
    try {
        const {user} = await this.oAuth.createUserWithEmailAndPassword(usuario.correo,usuario.password);
        await this.updateUserData(usuario, user.uid);
        return user;

    }catch(error){
        console.log('err', error);
    }
  }

  async updateUserData(usuario:Users, uid: string) {
    await this.afs.collection('userApp').doc(uid)
    .set({
      ... usuario,
      password: '',
    })
  }
}
