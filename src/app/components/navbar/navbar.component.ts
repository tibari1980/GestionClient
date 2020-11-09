import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 title:string="La Flèche d'or";
 isLoggedIn:boolean=false;
 IsEmailUserConnected:string="";
  constructor(private autService:AuthService,private route:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
    this.autService.getAuth().subscribe(user=>{
      if(user){
        this.isLoggedIn=true;
        this.IsEmailUserConnected=user.email;
      }else{
        this.isLoggedIn=false;
      }
    })
  }
  /*
   LogOut 
   redirection vers la page login
  */
  onLogOut(){
    this.autService.logout();
    this.isLoggedIn=false;
    return this.route.navigate(['/login']);
  }
}
