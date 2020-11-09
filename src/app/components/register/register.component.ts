import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password:string;
  email:string;
  constructor(private authService:AuthService,private route:Router,private flashMessage:FlashMessagesService) {

   }

  ngOnInit(): void {
  }



  onRegister(){
   this.authService.createUser(this.email,this.password)
   .then((register)=>{
     if(register){
         this.flashMessage.show('Le compte à été créé avec success!',{cssClass:'alert-success',timeout:5000});
          this.route.navigate(['']);
     }
   })
   .catch((error)=>{
       this.flashMessage.show(error.message,{cssClass:'alert-danger',timeout:5000});
       this.route.navigate(['/register']);
   })
  }
}
