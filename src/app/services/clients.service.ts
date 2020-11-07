
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Client } from './../models/client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  endPoint='/clients';
   clients:Observable<Client[]>;
   clientDoc:AngularFirestoreDocument<Client>;
   clientsRef:AngularFirestoreCollection<Client>;
  constructor(private fs:AngularFirestore) {
    this.clientsRef=this.fs.collection(this.endPoint);
    this.clients = this.clientsRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

 
  findAllClient(){
    return this.clients;
  }

  /*
  add Client
  */
  createClient(client:Client):Promise<Client>{
    return this.clientsRef.add(client);
  }

  updateClient(client:Client){
    this.clientDoc=this.clientsRef.doc<Client>(client.id);
    return this.clientDoc.update(client);
  }

  deleteClient(client:Client):Promise<any>{
    this.clientDoc=this.clientsRef.doc<Client>(client.id);
    return this.clientDoc.delete();
  }

  findOneClient(id:string):Observable<Client>{
    return this.clientsRef.doc(id).valueChanges();
  }

}





