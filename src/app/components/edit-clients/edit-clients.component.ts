
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {
  clientModule:Client={}
  clients:Client[];
  constructor(private clientService:ClientsService,private route:Router,
              private router:ActivatedRoute,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
   let code=this.router.snapshot.params.id;
   this.clientService.findOneClient(code).subscribe(data=>{
     this.clientModule=data;
     this.clientModule.id=code;
   },error=>{
     console.log(error);
   })
  }


  onUpdateClient(){
    console.log(this.clientModule.id);
    this.clientService.updateClient(this.clientModule).then(_=>console.log('client updated successfully')).catch(error=>console.log(error,'failed to update client pleaze try again'));
    this.flashMessage.show('client modifié avec success !',{cssClass:'alert-info',timeout:5000});
    this.clientModule=null;
    return this.route.navigate(['clients']);
    
  }
}
