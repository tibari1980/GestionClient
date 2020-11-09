import { Client } from './../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-clients',
  templateUrl: './show-clients.component.html',
  styleUrls: ['./show-clients.component.css']
})
export class ShowClientsComponent implements OnInit {

  client: Client;
  balanceActuel: number = null;
  currentId:string;
  showMontant: boolean = false;
  constructor(private clientServie: ClientsService, private route: ActivatedRoute, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params.id;
    this.clientServie.findOneClient(this.currentId).subscribe(data => {
      
      this.client = data;
      this.client.id=this.currentId;
      

    }, error => {
      console.log(error);
    })
  }


  OnUpdataBalance() {

    Swal.fire({
      title: 'Etes-vous sur?',
      text: 'Vous êtes sur le point de modifié la  balance attention !' +this.currentId,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Oui, modifié le!',
      cancelButtonText: 'Non, exit!'
    }).then((result) => {
      if (result.value) {
        let balanceFinal = this.client.Balance - this.balanceActuel;
        if (balanceFinal > 0 || balanceFinal == 0) {
          this.client.Balance = balanceFinal;
          this.client.id=this.currentId;
          this.clientServie.updateClient(this.client).then(_ => console.log('Balance updated successufully')).catch(error => console.log(error, 'Failed to update balance please try again'));
          this.showMontant = false;
          return this.flashMessage.show('Balance modifié avec success!', { cssClass: 'alert-success', timeout: 5000 });
        } else {
          return this.flashMessage.show('Erreur modification de la balance!', { cssClass: 'alert-danger', timeout: 5000 });
        }
        Swal.fire({
          title: 'Balance à été mis à jour?',
          text: 'La balance à ét modifié avec success !',
          timer: 3000,
          icon:'success'
        })
      }
    })




  }

  onDeleteClient(id: string) {
    Swal.fire({
      title: 'Etes-vous sur?',
      text: 'Vous êtes sur le point de supprimé ce client !' + id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimé le!',
      cancelButtonText: 'Non, exit!'
    }).then((result) => {
      if (result.value) {
        this.clientServie.deleteClient(this.client).then(_ => console.log('Client deleted successfully')).catch(error => console.log(error, 'Failed to delete client please try again'));
        this.flashMessage.show('Client à été supprimé avec success', { cssClass: 'alert-danger', timeout: 5000 })
        return this.router.navigate(['clients']);
        Swal.fire({
          title: 'supprimé?',
          text: 'Client à été supprimé avec success !',
          timer: 4000
        })
      }
    })



  }
}
