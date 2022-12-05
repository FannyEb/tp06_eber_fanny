import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../model/client';
import { ServiceBase } from '../service-base';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ServiceBase{

  apiEnd : string = "client";
  clients : Client[] = [];

  constructor(private http: HttpClient) { 
    super()
  }

  getAll(): Client[] {
    return this.clients  
  }

  get(id: number): Client | undefined {
    return this.clients.find(c => c.id == id);
  }

  post(client: Client): Observable<Client>  {
    client.id = this.clients.length
    return this.http.post<Client>(this.apiUrl+this.apiEnd, client)
  }

  put(client: Client) {
    this.clients = this.clients.filter(c => c.id != client.id);
    this.clients.push(client);
  }

  delete(id: number) {
    this.clients = this.clients.filter(c => c.id != id);
  }
}
