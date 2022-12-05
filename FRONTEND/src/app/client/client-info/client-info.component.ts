import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../core/model/client';
import { ClientService } from '../../core/service/client/client.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit{

  @Output() back: EventEmitter<any> = new EventEmitter();
  client: Client = new Client;

  constructor(private route: ActivatedRoute, private clientService: ClientService) { }

  ngOnInit() {
    let getClient = this.clientService.get(this.route.snapshot.params['id'])
    if(getClient){
      this.client = getClient
    }
  }

}
