
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  /*
   Méthode permet de s'authentifié par email et mot de passe 
  */
  singIn(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((userData)=>resolve(userData),(error)=>reject(error));
    });
  }

  /*
   Cette méthode permet de vérifié si l'utilisateur connecté veut afficher le formulaire d'authentification
  */
  getAuth(){
    return this.afAuth.authState.pipe(auth=>auth);
  }

  /*
   s'authenfifié avec le compte google
  */
  singInWithAccountGoogle(){
   return new Promise((resolve,reject)=>{
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
     .then((userData)=>resolve(userData),(error)=>reject(error));
   })
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  createUser(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then((userData)=>resolve(userData),(error)=>reject(error));
    })
  }
}
