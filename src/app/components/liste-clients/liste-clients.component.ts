import { AuthService } from './../../services/auth.service';

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
  SearchClient:Client[];
  totalBalance:number=0;
  constructor(private clientsService:ClientsService,
              private authService:AuthService,
              private route:ActivatedRoute,
              private router:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
    //récupération de l'id utilusateur authentifié 
    this.authService.getAuth().subscribe(user=>{
      //Récupérer la liste des clients de l'utilisateur authentifié 
    this.clientsService.findAllClient(user.uid).subscribe(data=>{
      this.SearchClient=this.clients=data;
      this.totalBalance=this.getTotal();
    },error=>{
      console.log(error,'Failed to download data !');
    })
    },error=>{
      console.log(error);
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
 
  /*
   Méthode permet d'effectuer la recherche par lastName et FirstName et email et balanca
  */
  chercher(query:string){
     this.SearchClient=(query)?this.clients.filter(client=>
                                                      client.firstName.toLowerCase().includes(query.toLowerCase())
                                                      || client.lastName.toLowerCase().includes(query.toLowerCase())
                                                      || client.email.toLowerCase().includes(query.toLowerCase())
                                                      || client.Balance==parseFloat(query)):this.clients;
  }
  getTotal(){
    return this.clients.reduce((totalInitial,client)=>{
      return totalInitial+parseFloat(client.Balance.toString());
    },0)
  }
}
