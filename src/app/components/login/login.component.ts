import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordModule:string=null;
  emailModule:string=null;
  constructor(private flashMessage:FlashMessagesService,
              private route:Router,
              public serviceAuth:AuthService) {
              
               }

  ngOnInit(): void {
  
    this.serviceAuth.getAuth().subscribe(user=>{
      if(user){
        return this.route.navigate(['/']);
      }else{
        return this.route.navigate(['login']);
      }
    },error=>{
      console.log(error);
    })
  }
  onSeConnecte(){
   this.serviceAuth.singIn(this.emailModule,this.passwordModule)
   .then(user=>{
      if(user){
        this.flashMessage.show('Vous êtes connecté avec success',{cssClass:'alert-success',timeout:5000})
        this.route.navigate(['/']);
      }
   })
   .catch(error=>{
     this.flashMessage.show("Il n'y a pas d'enregistrement d'utilisateur correspondant à cet identifiant.",{cssClass:'alert-danger',timeout:10000});
     console.log(error.message);
     this.route.navigate(['login']);

   })
    
  }
  

  OnseConnecteAvecCompteGoogle(){
    this.serviceAuth.singInWithAccountGoogle()
    .then(user=>{
       if(user){
         this.flashMessage.show('Vous êtes connecté avec success',{cssClass:'alert-success',timeout:5000})
         this.route.navigate(['/']);
       }
    })
    .catch(error=>{
      this.flashMessage.show("Il n'y a pas d'enregistrement d'utilisateur correspondant à cet identifiant.",{cssClass:'alert-danger',timeout:10000});
      console.log(error.message);
      this.route.navigate(['login']);
    })
  }


}
