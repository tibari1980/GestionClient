import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Client } from './../models/client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  endPoint:'clients';
  clientsCollection:AngularFirestoreCollection<Client>;
  clientDoc:AngularFirestoreDocument<Client>;
  constructor(private fs:AngularFirestore) {
    this.clientsCollection=this.fs.collection(this.endPoint);
  }
 
  findAllClient():Observable<Client[]>{
    return  this.clientsCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
  }



}





