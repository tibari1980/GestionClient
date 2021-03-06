import { AuthService } from './../../services/auth.service';
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {
  clientModule:Client={}
  constructor(private clientService:ClientsService,
              private authService:AuthService,
             private route:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
   this.authService.getAuth().subscribe(user=>{
     //récupération de l'utilisateur authentifié 
    this.clientModule.user= user.uid;
   },error=>{
     console.log(error);
   })
  }
 
  /*
   Ajouté un client
  */
  onSaveClient(){
    this.clientService.createClient(this.clientModule).then(_=>{
      console.log('Client Created successfully');
    }).catch(error=>console.log('Failed to create client'));

    this.flashMessage.show('Client ajouté avec success !',{cssClass:'alert-primary',timeout:5000});
    return this.route.navigate(['clients']);
  }
  show(x){
    console.log("toto"+x)
  }
}
