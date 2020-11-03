import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-liste-clients',
  templateUrl: './liste-clients.component.html',
  styleUrls: ['./liste-clients.component.css']
})
export class ListeClientsComponent implements OnInit {

  clients:Client[];
  constructor(private clientsService:ClientsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.clientsService.findAllClient().subscribe(data=>{
      this.clients=data;
      console.log(this.clients);
    },error=>{
      console.log(error,'Failed to download data please try again');
    })
   
  }
  
}
