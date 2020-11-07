
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
     
  constructor(private angularFireAuth: AngularFireAuth) { 
    
  }
 
   
}
