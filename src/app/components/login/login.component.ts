import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password:string=null;
  email:string=null;
  constructor(private authService:AuthClientService,
              private flashMessage:FlashMessagesService,
              private route:Router) { }

  ngOnInit(): void {
  }
  onSeConnecte(){
  
  }
  
 /*
  onSeConnecte(){
    this.authService.login(this.email,this.password).then(auth=>{
      if(auth){
        this.flashMessage.show('vous êtes connecté avec success',{cssClass:'alert-success',timeout:5000});
      }
      this.route.navigate(['/']);
    })
    .catch(error=>{
      
    })
  }
  */


}
