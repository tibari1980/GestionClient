
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-liste-clients',
  templateUrl: './liste-clients.component.html',
  styleUrls: ['./liste-clients.component.css']
})
export class ListeClientsComponent implements OnInit {

  clients:Client[];
  totalBalance:number=0;
  constructor(private clientsService:ClientsService,
              private route:ActivatedRoute,
              private router:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
    this.clientsService.findAllClient().subscribe(data=>{
      this.clients=data;
      this.totalBalance=this.getTotal();
    },error=>{
      console.log(error,'Failed to download data !');
    })   
  }

  
  onDeleteClient(client:Client){

    Swal.fire({
      title: 'êtes-vous sur  ?',
      text: 'Vous êtes sur le point de supprimé ce client !'+client.id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimé le!',
      cancelButtonText: 'Non, exit'
    }).then((result) => {
      if (result.value) {
        this.clientsService.deleteClient(client).then(_=>console.log('Client deleted successfully')).catch(error=>console.log(error,'Failed to delete client please try again'));
        this.flashMessage.show('Client à été supprimé avec success',{cssClass:'alert-danger',timeout:5000})
        return this.router.navigate(['clients']);
        Swal.fire({
          title: 'supprimé?',
          text: 'Client à été supprimé avec success !',
          timer:4000
        })
      } 
    })
  }

  getTotal(){
    return this.clients.reduce((totalInitial,client)=>{
      return totalInitial+parseFloat(client.Balance.toString());
    },0)
  }
}
